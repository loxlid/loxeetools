import { CoinData } from './api';

export interface Signal {
    coinId: string;
    symbol: string;
    type: 'BUY' | 'SELL' | 'WATCH';
    reason: string;
    strength: 'HIGH' | 'MEDIUM' | 'LOW';
    price: number;
    entry: number;
    tp: number;
    sl: number;
    leverage: string;
    futures: boolean;
}

// Helper: Calculate RSI
function calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50; // Not enough data

    let gains = 0;
    let losses = 0;

    for (let i = prices.length - period; i < prices.length; i++) {
        const difference = prices[i] - prices[i - 1];
        if (difference >= 0) {
            gains += difference;
        } else {
            losses += Math.abs(difference);
        }
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    if (avgLoss === 0) return 100;

    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

// Helper: Calculate Standard Deviation (Volatility)
function calculateVolatility(prices: number[]): number {
    const n = prices.length;
    if (n === 0) return 0;
    const mean = prices.reduce((a, b) => a + b) / n;
    const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    return Math.sqrt(variance);
}

// Helper: Determine Leverage based on Risk (Volatility & Rank) vs Reward (Strength)
function suggestLeverage(rank: number, volatilityIsHigh: boolean, strength: 'HIGH' | 'MEDIUM' | 'LOW'): string {
    let leverage = 5; // Safe default for alts

    // high rank = safer (usually)
    if (rank <= 10) leverage = 20;       // BTC, ETH, etc.
    else if (rank <= 50) leverage = 10;  // Major Alts
    else if (rank <= 100) leverage = 5;  // Mid Caps
    else leverage = 3;                   // Low Caps / Risky

    // Volatility Penalty
    if (volatilityIsHigh) {
        leverage = Math.max(2, Math.floor(leverage / 2));
    }

    // Strength Adjustment (If signal is weak, don't risk much)
    if (strength === 'MEDIUM') leverage = Math.max(2, Math.floor(leverage * 0.8));
    if (strength === 'LOW') leverage = 2;

    return `Isolated ${leverage}x`;
}

export function generateSignals(coins: CoinData[]): Signal[] {
    const signals: Signal[] = [];

    coins.forEach(coin => {
        const prices = coin.sparkline_in_7d?.price || [];
        if (prices.length < 20) return; // Need data for AI analysis

        const currentRSI = calculateRSI(prices, 14);
        const volatility = calculateVolatility(prices); // Absolute std dev
        const priceChange = coin.price_change_percentage_24h || 0;
        const currentPrice = coin.current_price;
        const rank = coin.market_cap_rank;

        // Calculate Normalized Volatility (Coefficient of Variation)
        const meanPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        const normalizedVolatility = volatility / meanPrice;
        const isVolatile = normalizedVolatility > 0.05; // >5% deviation is volatile

        // Strategy 1: RSI Oversold + Reversal (Buy Signal)
        if (currentRSI < 30) {
            const strength = currentRSI < 20 ? 'HIGH' : 'MEDIUM';
            signals.push({
                coinId: coin.id,
                symbol: coin.symbol.toUpperCase(),
                type: 'BUY',
                reason: `AI detected Oversold conditions (RSI: ${currentRSI.toFixed(1)}). Potential rebound.`,
                strength: strength,
                price: currentPrice,
                entry: currentPrice,
                tp: currentPrice * 1.08, // 8% profit
                sl: currentPrice * 0.95, // 5% loss
                leverage: suggestLeverage(rank, isVolatile, strength),
                futures: rank <= 200 // Assuming top 200 have futures
            });
        }

        // Strategy 2: RSI Overbought (Sell/Watch Signal)
        else if (currentRSI > 70) {
            const strength = currentRSI > 80 ? 'HIGH' : 'MEDIUM';
            signals.push({
                coinId: coin.id,
                symbol: coin.symbol.toUpperCase(),
                type: 'SELL',
                reason: `AI detected Overbought conditions (RSI: ${currentRSI.toFixed(1)}). Risk of correction.`,
                strength: strength,
                price: currentPrice,
                entry: currentPrice,
                tp: currentPrice * 0.92, // 8% profit (drop)
                sl: currentPrice * 1.05, // 5% loss
                leverage: suggestLeverage(rank, isVolatile, strength),
                futures: rank <= 200
            });
        }

        // Strategy 3: Volatility Breakout (Watch Signal)
        // If volatility is high and price is moving fast, it's a breakout
        else if (Math.abs(priceChange) > 10) {
            const isPump = priceChange > 0;
            // Breakouts are risky, cap leverage lower
            const baseLev = suggestLeverage(rank, true, 'MEDIUM');

            signals.push({
                coinId: coin.id,
                symbol: coin.symbol.toUpperCase(),
                type: 'WATCH',
                reason: `High Volatility Detected. Massive movement (${priceChange.toFixed(2)}%) in 24h.`,
                strength: 'MEDIUM',
                price: currentPrice,
                entry: currentPrice, // Current price as reference
                tp: isPump ? currentPrice * 1.15 : currentPrice * 0.85,
                sl: isPump ? currentPrice * 0.90 : currentPrice * 1.10,
                leverage: baseLev,
                futures: rank <= 200
            });
        }

        // Strategy 4: Blue Chip Discount (Buy Signal)
        else if (coin.market_cap_rank <= 10 && priceChange < -4 && currentRSI < 45) {
            const strength = 'HIGH';
            signals.push({
                coinId: coin.id,
                symbol: coin.symbol.toUpperCase(),
                type: 'BUY',
                reason: `Blue Chip Discount. Major asset down ${Math.abs(priceChange).toFixed(1)}% with neutral RSI.`,
                strength: strength,
                price: currentPrice,
                entry: currentPrice,
                tp: currentPrice * 1.10,
                sl: currentPrice * 0.95,
                leverage: suggestLeverage(rank, isVolatile, strength),
                futures: true
            });
        }
    });

    // Sort by strength (High first) and limit
    return signals
        .sort((a, b) => {
            const strengthScore = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
            return strengthScore[b.strength] - strengthScore[a.strength];
        })
        .slice(0, 6);
}
