# Implementation Plan - CryptoWebTools

This project aims to build a premium, high-aesthetic web application for tracking cryptocurrency prices, aggregating news, and creating trading signals.

## User Requirements
1.  **Check Cryptocurrency Prices**: Real-time or near real-time pricing.
2.  **Latest Crypto News**: Automated news feed.
3.  **Crypto Coin Signals**: Potential buy/sell indicators.

## Tech Stack
-   **Framework**: Next.js (React)
-   **Language**: TypeScript
-   **Styling**: Vanilla CSS (CSS Modules) for maximum control and premium feel (Glassmorphism, Animations).
-   **Data**: CoinGecko API (Prices), CryptoPanic or customizable RSS feeds (News).

## Phases

### Phase 1: Foundation & Design System
-   [ ] Initialize Next.js project.
-   [ ] Configure `globals.css` with CSS variables for a "Cyberpunk/Future" dark theme (Neon, deep blacks, glass effects).
-   [ ] Create reusable UI components (GlassCard, NeonButton, AnimatedGrid).
-   [ ] Implement the main App Layout (Navigation, Header, Mobile Menu).

### Phase 2: Core Features - Prices (Market Overview)
-   [ ] Integrate CoinGecko API for 'Market' data.
-   [ ] Create a `CryptoTicker` component for the header.
-   [ ] Build the `MarketTable` or `CoinGrid` with realtime-like updates.
-   [ ] Add mini-charts (SVG Sparklines) for 7d trend.

### Phase 3: News & Insights
-   [ ] Build a News feed aggregator using a free crypto news API.
-   [ ] Design `NewsCard` with hover effects and "read more" expansion.
-   [ ] Implement category filtering (e.g., "Regulations", "Tech", "Market").

### Phase 4: Signals & "Gem Hunter"
-   [ ] Implement a basic signal algorithm (e.g., Change > 5% in 1h, RSI simulation).
-   [ ] Create a "Signals Dashboard" showing Hot/Cold assets.
-   [ ] Add a "Sentiment Analysis" visualizer (Fear & Greed Index).

### Phase 5: Polish & Animations
-   [ ] Add page transitions.
-   [ ] Implement micro-interactions (hover states, loaders).
-   [ ] Ensure mobile responsiveness.
-   [ ] SEO optimization (Meta tags).
