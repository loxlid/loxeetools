export interface CoinData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_percentage_24h: number;
    sparkline_in_7d: { price: number[] };
}

export const fetchMarketData = async (): Promise<CoinData[]> => {
    try {
        const res = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h,24h,7d',
            { next: { revalidate: 60 } }
        );
        if (!res.ok) throw new Error('Failed to fetch market data');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
