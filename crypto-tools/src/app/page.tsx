import Navbar from '@/components/Navbar';
import MarketTable from '@/components/MarketTable';
import NewsFeed from '@/components/NewsFeed';
import SignalList from '@/components/SignalList';
import AirdropCalculator from '@/components/AirdropCalculator';
import { fetchMarketData } from '@/lib/api';
import { fetchNews } from '@/lib/news';
import { generateSignals } from '@/lib/signals';

export default async function Home() {
  const marketData = await fetchMarketData();
  const newsData = await fetchNews();
  const signals = generateSignals(marketData);

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />

      <div className="container">
        <header style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Crypto Intelligence
          </h1>
          <p style={{ color: 'var(--fg-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Real-time market data, curated news, and potentially lucrative signals for the modern investor.
          </p>
        </header>

        {/* Signals & News Section */}
        {/* Signals & News Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginBottom: '4rem' }}>

          {/* Signals Section */}
          <section style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>AI Analysis</h2>
              <span style={{ background: 'var(--accent-primary)', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>Live v2.0</span>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '300px' }}>
              <SignalList signals={signals} />
            </div>
          </section>

          {/* News Section */}
          <section style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Latest News</h2>
              <a href="/news" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 600 }}>View All -&gt;</a>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '300px' }}>
              <NewsFeed news={newsData} />
            </div>
          </section>

          {/* Airdrop Calculator Section */}
          <section style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Airdrop Calc</h2>
              <span style={{ background: 'var(--accent-glow)', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>New</span>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '300px' }}>
              <AirdropCalculator />
            </div>
          </section>

        </div>

        <section style={{ marginBottom: '4rem' }}>
          <MarketTable data={marketData} />
        </section>
      </div>
      <footer style={{ textAlign: 'center', padding: '2rem', fontSize: '0.8rem', color: 'var(--fg-secondary)', borderTop: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
        powered by loxee
      </footer>
    </main>
  );
}
