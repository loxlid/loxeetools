'use client';

import Image from 'next/image';

import { useState, useMemo } from 'react';
import { CoinData } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import styles from './MarketTable.module.css';

const MarketTable = ({ data }: { data: CoinData[] }) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    const filteredData = useMemo(() => {
        return data.filter((coin: CoinData) => {
            if (!coin) return false;
            return (
                (coin.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
                (coin.symbol?.toLowerCase() || '').includes(search.toLowerCase())
            );
        });
    }, [search, data]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.sectionTitle}>Market Overview</h2>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search Coin..."
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        color: 'var(--fg-primary)',
                        outline: 'none',
                        minWidth: '200px'
                    }}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coin</th>
                            <th className={styles.right}>Price</th>
                            <th className={styles.right}>24h Change</th>
                            <th className={styles.right}>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((coin) => (
                                <tr key={coin.id} className={styles.row}>
                                    <td className={styles.rank}>{coin.market_cap_rank}</td>
                                    <td>
                                        <div className={styles.coinInfo}>
                                            <Image src={coin.image} alt={coin.name} className={styles.coinIcon} width={32} height={32} unoptimized />
                                            <div>
                                                <span style={{ fontWeight: 700, display: 'block' }}>{coin.name}</span>
                                                <span className={styles.symbol}>{coin.symbol.toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.right}>${formatPrice(coin.current_price)}</td>
                                    <td className={`${styles.right} ${(coin.price_change_percentage_24h || 0) >= 0 ? styles.positive : styles.negative}`}>
                                        {(coin.price_change_percentage_24h || 0).toFixed(2)}%
                                    </td>
                                    <td className={styles.right}>${(coin.market_cap || 0).toLocaleString('en-US')}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--fg-secondary)' }}>
                                    No coins found matching &quot;{search}&quot;
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className={styles.controls}>
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={styles.pageButton}
                    >
                        Previous
                    </button>
                    <span style={{ fontSize: '0.9rem', color: 'var(--fg-secondary)', display: 'flex', alignItems: 'center' }}>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={styles.pageButton}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default MarketTable;
