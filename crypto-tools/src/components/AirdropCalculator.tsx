'use client';

import { useState, useMemo } from 'react';
import styles from './AirdropCalculator.module.css';

const AirdropCalculator = () => {
    const [marketCap, setMarketCap] = useState<string>('');
    const [totalSupply, setTotalSupply] = useState<string>('');
    const [circulatingSupply, setCirculatingSupply] = useState<string>('');
    const [myAllocation, setMyAllocation] = useState<string>('');

    const calculatedValues = useMemo(() => {
        const mc = parseFloat(marketCap) || 0;
        const ts = parseFloat(totalSupply) || 0;
        const cs = parseFloat(circulatingSupply) || 0;
        const allocation = parseFloat(myAllocation) || 0;

        const price = cs > 0 ? mc / cs : 0;

        return {
            tokenPrice: price,
            fdv: price * ts,
            earnings: price * allocation
        };
    }, [marketCap, totalSupply, circulatingSupply, myAllocation]);

    const formatCurrency = (val: number, isPrice = false) => {
        if (val === 0) return '$0.00';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: isPrice ? 6 : 2
        }).format(val);
    };

    return (
        <div className={styles.calculator}>
            <div className={styles.inputsGrid}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Market Cap ($)</label>
                    <input
                        type="number"
                        className={styles.input}
                        placeholder="e.g. 500000000"
                        value={marketCap}
                        onChange={(e) => setMarketCap(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Total Supply</label>
                    <input
                        type="number"
                        className={styles.input}
                        placeholder="e.g. 1000000000"
                        value={totalSupply}
                        onChange={(e) => setTotalSupply(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Circulating Supply</label>
                    <input
                        type="number"
                        className={styles.input}
                        placeholder="e.g. 150000000"
                        value={circulatingSupply}
                        onChange={(e) => setCirculatingSupply(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>My Allocation (Tokens)</label>
                    <input
                        type="number"
                        className={styles.input}
                        placeholder="e.g. 5000"
                        value={myAllocation}
                        onChange={(e) => setMyAllocation(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.results}>
                <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Token Price</span>
                    <span className={styles.resultValue}>{formatCurrency(calculatedValues.tokenPrice, true)}</span>
                </div>
                <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>FDV</span>
                    <span className={styles.resultValue}>{formatCurrency(calculatedValues.fdv)}</span>
                </div>
                <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>My Earnings</span>
                    <span className={styles.resultValue}>{formatCurrency(calculatedValues.earnings)}</span>
                </div>
            </div>
        </div>
    );
};

export default AirdropCalculator;
