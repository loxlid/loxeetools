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

// ==========================================
// TECHNICAL INDICATORS
// ==========================================

// Simple Moving Average
function calculateSMA(data: number[], period: number): number[] {
    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
        const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        sma.push(sum / period);
    }
    return sma;
}

// Exponential Moving Average
function calculateEMA(data: number[], period: number): number[] {
    const k = 2 / (period + 1);
    const emaArray = [data[0]];
    for (let i = 1; i < data.length; i++) {
        emaArray.push(data[i] * k + emaArray[i - 1] * (1 - k));
    }
    return emaArray;
}

// Relative Strength Index
function calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50;

    let gains = 0;
    let losses = 0;

    // Calculate initial average
    for (let i = 1; i <= period; i++) {
        const diff = prices[i] - prices[i - 1];
        if (diff >= 0) gains += diff;
        else losses += Math.abs(diff);
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    // Smooth subsequent values
    // We only need the *last* RSI for the signal, but correctly smoothing requires iterating
    // However, for performance on 168 points, we can just do a simple simple averge of the last chunk or the full smoothing loop.
    // Let's do the standard Wilder's Smoothing for better accuracy over the dataset
    for (let i = period + 1; i < prices.length; i++) {
        const diff = prices[i] - prices[i - 1];
        const gain = diff >= 0 ? diff : 0;
        const loss = diff < 0 ? Math.abs(diff) : 0;

        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;
    }

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

// Moving Average Convergence Divergence
function calculateMACD(prices: number[], fast = 12, slow = 26, signal = 9) {
    const emaFast = calculateEMA(prices, fast);
    const emaSlow = calculateEMA(prices, slow);

    // EMA arrays might be different lengths if we started from index 0? 
    // No, calculateEMA returns array same length as input (padded/calculated from start).
    // But mathematically EMA needs previous values. Our helper `calculateEMA` returns N items for N input.

    const macdLine: number[] = [];
    for (let i = 0; i < prices.length; i++) {
        macdLine.push(emaFast[i] - emaSlow[i]);
    }

    const signalLine = calculateEMA(macdLine, signal);
    const histogram = macdLine.map((val, i) => val - signalLine[i]);

    return {
        macd: macdLine[macdLine.length - 1],
        signal: signalLine[signalLine.length - 1],
        histogram: histogram[histogram.length - 1],
        prevHistogram: histogram[histogram.length - 2] || 0
    };
}

// Bollinger Bands
function calculateBollingerBands(prices: number[], period = 20, stdDevMulti = 2) {
    if (prices.length < period) return null;
    
    // We only need the latest values
    const slice = prices.slice(-period);
    const mean = slice.reduce((a, b) => a + b, 0) / period;
    const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
    const stdDev = Math.sqrt(variance);

    return {
        upper: mean + (stdDev * stdDevMulti),
        middle: mean,
        lower: mean - (stdDev * stdDevMulti),
        width: (mean + (stdDev * stdDevMulti)) - (mean - (stdDev * stdDevMulti))
    };
}

// Helper: Determine Leverage based on Risk vs Reward
function suggestLeverage(rank: number, volatilityIsHigh: boolean, strength: 'HIGH' | 'MEDIUM' | 'LOW'): string {
    let leverage = 5;

    if (rank <= 10) leverage = 20;       // Major
    else if (rank <= 50) leverage = 10;  // Alts
    else if (rank <= 100) leverage = 5;  // Mid
    else leverage = 3;                   // Risky

    if (volatilityIsHigh) leverage = Math.max(2, Math.floor(leverage / 2));
    
    if (strength === 'MEDIUM') leverage = Math.max(2, Math.floor(leverage * 0.75));
    if (strength === 'LOW') leverage = 2;

    return `Isolated ${leverage}x`;
}

// ==========================================
// SIGNAL GENERATOR
// ==========================================

export function generateSignals(coins: CoinData[]): Signal[] {
    const signals: Signal[] = [];

    coins.forEach(coin => {
        const prices = coin.sparkline_in_7d?.price || [];
        if (prices.length < 50) return; // Need at least 50 points for EMA/SMA 50

        const currentPrice = coin.current_price;
        const rank = coin.market_cap_rank;
        const priceChange24h = coin.price_change_percentage_24h || 0;

        // --- CALCULATE INDICATORS ---
        const rsi = calculateRSI(prices);
        const macd = calculateMACD(prices);
        const bb = calculateBollingerBands(prices);
        
        // SMA for trend (using 50-period on hourly data ~= 2 day trend)
        const sma50 = calculateSMA(prices, 50).pop() || 0;
        const sma20 = calculateSMA(prices, 20).pop() || 0;

        // Volatility measure (Bandwidth or just std dev)
        const isVolatile = bb ? (bb.width / bb.middle) > 0.1 : false; 

        // --- STRATEGIES ---

        // 1. COMPOSITE REVERSAL (RSI + MACD) - HIGH CONFIDENCE
        // Buy: RSI Oversold < 35 AND MACD Histogram flipping positive
        if (rsi < 35 && macd.histogram > 0 && macd.prevHistogram < 0) {
            signals.push({
                coinId: coin.id,
                symbol: coin.symbol.toUpperCase(),
                type: 'BUY',
                reason: `Strong Reversal: RSI Oversold (${rsi.toFixed(1)}) + MACD Bullish Crossover.`,
                strength: 'HIGH',
                price: currentPrice,
                entry: currentPrice,
                tp: currentPrice * 1.12,
                sl: currentPrice * 0.94,
                leverage: suggestLeverage(rank, isVolatile, 'HIGH'),
                futures: rank <= 200
            });
            return; // Don't produce multiple signals for same coin
        }

        // Sell: RSI Overbought > 65 AND MACD Histogram flipping negative
        if (rsi > 65 && macd.histogram < 0 && macd.prevHistogram > 0) {
            signals.push({
                coinId: coin.id,
                symbol: coin.symbol.toUpperCase(),
                type: 'SELL',
                reason: `Top Reversal: RSI Overbought (${rsi.toFixed(1)}) + MACD Bearish Divergence.`,
                strength: 'HIGH',
                price: currentPrice,
                entry: currentPrice,
                tp: currentPrice * 0.88,
                sl: currentPrice * 1.06,
                leverage: suggestLeverage(rank, isVolatile, 'HIGH'),
                futures: rank <= 200
            });
            return;
        }

        // 2. BOLLINGER BAND SQUEEZE BREAKOUT - MEDIUM CONFIDENCE
        // Price breaks upper band + High Volume/Momentum (proxy via price change)
        if (bb && currentPrice > bb.upper && priceChange24h > 5) {
             signals.push({
                coinId: coin.id,
                symbol: coin.symbol.toUpperCase(),
                type: 'BUY',
                reason: `Volatility Breakout: Price broke upper Bollinger Band with +${priceChange24h.toFixed(1)}% surge.`,
                strength: 'MEDIUM',
                price: currentPrice,
                entry: currentPrice,
                tp: currentPrice * 1.15, // Ride the wave
                sl: currentPrice * 0.92, // Wide stop for volatility
                leverage: suggestLeverage(rank, true, 'MEDIUM'),
                futures: rank <= 200
            });
            return;
        }

        // 3. GOLDEN CROSS (Short Term) - MEDIUM CONFIDENCE
        // SMA 20 crosses above SMA 50
        // We need to check if it JUST crossed. 
        // For simplicity in this snapshot, we check if 20 > 50 AND RSI is healthy (40-60)
        if (sma20 > sma50 && rsi > 40 && rsi < 65 && priceChange24h > 0) {
             signals.push({
                coinId: coin.id,
                symbol: coin.symbol.toUpperCase(),
                type: 'WATCH', // Watch for entry
                reason: `Bullish Trend: Short-term Golden Cross (SMA20 > SMA50) with stable RSI.`,
                strength: 'MEDIUM',
                price: currentPrice,
                entry: currentPrice,
                tp: currentPrice * 1.08,
                sl: currentPrice * 0.96,
                leverage: suggestLeverage(rank, isVolatile, 'MEDIUM'),
                futures: rank <= 200
            });
             return; // Watch list often doesn't need return, but let's keep it simple
        }

        // 4. RSI EXTREMES (Fallback) - LOW/MEDIUM CONFIDENCE
        if (rsi < 25) {
            signals.push({
                coinId: coin.id,
                symbol: coin.symbol.toUpperCase(),
                type: 'BUY',
                reason: `Oversold: RSI is extremely low (${rsi.toFixed(1)}). Watch for bounce.`,
                strength: 'MEDIUM',
                price: currentPrice,
                entry: currentPrice,
                tp: currentPrice * 1.06,
                sl: currentPrice * 0.97,
                leverage: suggestLeverage(rank, isVolatile, 'MEDIUM'),
                futures: rank <= 200
            });
        }
    });

    // Prioritize HIGH strength, then sort by magnitude of relevant indicator?
    // Just sort by strength priority
    return signals
        .sort((a, b) => {
            const strengthScore = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
            return strengthScore[b.strength] - strengthScore[a.strength];
        })
        .slice(0, 10); // Show top 10
}
