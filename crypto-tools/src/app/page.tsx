import Navbar from '@/components/Navbar';
import MarketTable from '@/components/MarketTable';
import NewsFeed from '@/components/NewsFeed';
import SignalList from '@/components/SignalList';
import AirdropCalculator from '@/components/AirdropCalculator';
import { fetchMarketData } from '@/lib/api';
import { fetchNews } from '@/lib/news';
import { generateSignals } from '@/lib/signals';
import styles from './Home.module.css';

export default async function Home() {
  const marketData = await fetchMarketData();
  const newsData = await fetchNews();
  const signals = generateSignals(marketData);

  return (
    <main className={styles.main}>
      <Navbar />

      <div className="container">
        <header className={styles.hero}>
          <h1 className={styles.title}>
            Crypto Intelligence
          </h1>
          <p className={styles.subtitle}>
            Real-time market data, curated news, and potentially lucrative signals for the modern investor.
          </p>
        </header>

        <div className={styles.dashboardGrid}>

          {/* AI Analysis Card */}
          <section className={`${styles.card} ${styles.aiCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <span>🤖 AI Analysis</span>
              </h2>
              <span className={styles.badge} style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' }}>
                Live v2.0
              </span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <SignalList signals={signals} />
            </div>
          </section>

          {/* News Card */}
          <section className={`${styles.card} ${styles.newsCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <span>📰 Latest News</span>
              </h2>
              <a href="/news" className={styles.viewAll}>
                View All <span>→</span>
              </a>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <NewsFeed news={newsData} />
            </div>
          </section>

          {/* Airdrop Calc Card */}
          <section className={`${styles.card} ${styles.airdropCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <span>🪂 Airdrop Calc</span>
              </h2>
              <span className={styles.badge} style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185' }}>
                New
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <AirdropCalculator />
            </div>
          </section>

        </div>

        <section style={{ animation: 'slideUp 0.8s ease-out 0.4s backwards' }}>
          <MarketTable data={marketData} />
        </section>
      </div>

      <footer style={{
        textAlign: 'center',
        padding: '3rem',
        fontSize: '0.9rem',
        color: 'var(--fg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '6rem'
      }}>
        <div style={{ opacity: 0.7 }}>powered by <strong>loxee</strong></div>
      </footer>
    </main>
  );
}
