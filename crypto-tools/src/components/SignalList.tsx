import { Signal } from '@/lib/signals';
import { formatPrice } from '@/lib/utils';
import styles from './SignalList.module.css';

const SignalList = ({ signals }: { signals: Signal[] }) => {
    return (
        <div className={styles.container}>
            {signals.length === 0 ? (
                <div className={styles.empty}>No signals detected at this moment.</div>
            ) : (
                signals.map((signal, idx) => (
                    <div key={idx} className={styles.card}>
                        <div className={styles.header}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className={styles.symbol}>{signal.symbol}</span>
                                {signal.futures && <span style={{ fontSize: '0.7rem', color: 'var(--fg-secondary)', border: '1px solid var(--border-subtle)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>FUTURES</span>}
                            </div>
                            <span className={`${styles.badge} ${styles[signal.type.toLowerCase()]}`}>{signal.type}</span>
                        </div>
                        <div className={styles.reason}>{signal.reason}</div>

                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>Entry</span>
                                <span className={styles.statValue}>${formatPrice(signal.entry)}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>Leverage</span>
                                <span className={`${styles.statValue} ${styles.leverage}`}>{signal.leverage}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>Take Profit</span>
                                <span className={`${styles.statValue} ${styles.tp}`}>${formatPrice(signal.tp)}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>Stop Loss</span>
                                <span className={`${styles.statValue} ${styles.sl}`}>${formatPrice(signal.sl)}</span>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <span className={`${styles.strength} ${styles[signal.strength.toLowerCase()]}`} style={{ marginLeft: 'auto' }}>
                                Confidence: {signal.strength}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SignalList;
