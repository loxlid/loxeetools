
export interface KnowledgeItem {
    keywords: string[];
    title: string;
    category: 'Layer 1' | 'Layer 2' | 'DeFi' | 'Tech' | 'History' | 'Trading' | 'Security' | 'NFT/Gaming' | 'Other';
    content: string;
}

export const cryptoKnowledge: KnowledgeItem[] = [
    // ============================================
    // LAYER 1 BLOCKCHAINS (The Foundation)
    // ============================================
    {
        keywords: ["bitcoin", "btc", "satoshi", "nakamoto", "pow", "halving", "taproot"],
        title: "Bitcoin (BTC)",
        category: "Layer 1",
        content: "Bitcoin is the first decentralized cryptocurrency (2009). It uses Proof-of-Work to secure the network. Key events: The Halving (every 4 years), SegWit (2017), and Taproot (2021). It is the 'Digital Gold' standard."
    },
    {
        keywords: ["ethereum", "eth", "vitalik", "smart contract", "evm", "merge"],
        title: "Ethereum (ETH)",
        category: "Layer 1",
        content: "The leading smart contract platform. Transitioned to Proof-of-Stake in 'The Merge'. It powers most of DeFi and NFTs. Roadmap: Surge (L2s), Scourge (Censorship resistance), Verge, Purge, Splurge."
    },
    {
        keywords: ["solana", "sol", "poh", "firedancer", "monolithic"],
        title: "Solana (SOL)",
        category: "Layer 1",
        content: "High-performance L1 using Proof-of-History. Known for low fees ($0.0002) and high speed (65k TPS). It takes a 'Monolithic' approach (doing everything on one chain) vs Ethereum's 'Modular' approach."
    },
    {
        keywords: ["cardano", "ada", "hoskinson", "eutxo", "peer review"],
        title: "Cardano (ADA)",
        category: "Layer 1",
        content: "A research-driven blockchain using the Ouroboros PoS consensus and eUTXO model. Known for academic rigor and formal verification, but slower development speed."
    },
    {
        keywords: ["sui", "mysten", "move", "object centric"],
        title: "Sui",
        category: "Layer 1",
        content: "A high-speed L1 built by former Meta engineers using the 'Move' programming language. It uses an 'Object-Centric' data model (everything is an NFT-like object) allowing for parallel transaction execution."
    },
    {
        keywords: ["aptos", "apt", "move", "block-stm"],
        title: "Aptos",
        category: "Layer 1",
        content: "Also built by ex-Meta engineers using Move. Focuses on the Block-STM parallel execution engine to achieve 100k+ theoretical TPS. Direct competitor to Sui and Solana."
    },
    {
        keywords: ["sei", "trading", "orderbook", "parallel"],
        title: "Sei",
        category: "Layer 1",
        content: "A specialized L1 optimized for trading. It has a built-in Central Limit Order Book (CLOB) engine and uses Parallel EVM technology for extreme speed."
    },
    {
        keywords: ["ton", "telegram", "open network", "sharding"],
        title: "TON (The Open Network)",
        category: "Layer 1",
        content: "Originally built by Telegram. It uses 'Infinite Sharding' to scale. Deeply integrated into the Telegram app (800M users), making it a massive on-ramp for Web3 adoption."
    },
    {
        keywords: ["near", "sharding", "nightshade", "account"],
        title: "NEAR Protocol",
        category: "Layer 1",
        content: "Uses 'Nightshade' sharding. Known for 'Chain Abstraction' (hiding crypto complexity) and human-readable addresses (e.g., 'alice.near')."
    },
    {
        keywords: ["fantom", "ftm", "sonic", "dag", "lachesis"],
        title: "Fantom (Sonic)",
        category: "Layer 1",
        content: "Uses a DAG-based consensus (Lachesis). It is rebranding/upgrading to 'Sonic' to achieve 2,000+ TPS with sub-second finality."
    },
    {
        keywords: ["bsc", "bnb", "binance", "smart chain"],
        title: "BNB Chain (BSC)",
        category: "Layer 1",
        content: "A fork of Ethereum (Geth) with larger blocks and fewer validators (DPoS) for speed and low fees. Controlled largely by the Binance ecosystem. High retail usage."
    },
    {
        keywords: ["tron", "trx", "justin sun", "usdt"],
        title: "Tron (TRX)",
        category: "Layer 1",
        content: "Founded by Justin Sun. It is the dominant chain for USDT (Tether) transfers due to low fees. Uses DPoS consensus."
    },
    {
        keywords: ["avalanche", "avax", "subnets", "snowman"],
        title: "Avalanche",
        category: "Layer 1",
        content: "EVM compatible but uses Snowman consensus. Key feature is 'Subnets' - app-specific chains that share security but are customizable."
    },
    {
        keywords: ["kaspa", "kas", "blockdag", "ghostdag", "pow"],
        title: "Kaspa",
        category: "Layer 1",
        content: "A Proof-of-Work chain that uses a BlockDAG (Directed Acyclic Graph) instead of a linear chain. It allows blocks to be created in parallel, solving the 'Trilemma' of Security, Scalability, and Decentralization."
    },
    {
        keywords: ["monero", "xmr", "privacy", "ring ct"],
        title: "Monero",
        category: "Layer 1",
        content: "The gold standard for privacy. Uses Ring Signatures and Stealth Addresses to hide sender, receiver, and amount. IRS has a bounty to crack it (unsuccessfully so far)."
    },

    // ============================================
    // LAYER 2 & SCALING
    // ============================================
    {
        keywords: ["arbitrum", "arb", "optimistic", "rollup"],
        title: "Arbitrum",
        category: "Layer 2",
        content: "The leading Ethereum L2 by TVL. Uses Optimistic Rollup tech. 'Arbitrum One' is for DeFi, 'Nova' is for gaming."
    },
    {
        keywords: ["optimism", "op", "superchain", "stack"],
        title: "Optimism",
        category: "Layer 2",
        content: "Optimistic Rollup. Creator of the 'OP Stack', a framework for building L2s. Base, Zora, and Worldcoin are all built on the OP Stack (The Superchain)."
    },
    {
        keywords: ["base", "coinbase", "blue"],
        title: "Base",
        category: "Layer 2",
        content: "Coinbase's L2 built on OP Stack. No token (yet). Leveraging Coinbase's 100M+ users to bring retail on-chain."
    },
    {
        keywords: ["zksync", "zk", "matter labs", "hyperchain"],
        title: "zkSync",
        category: "Layer 2",
        content: "A ZK-Rollup using 'ZK-SNARKs'. Features native Account Abstraction. Moving towards a 'Hyperchain' network."
    },
    {
        keywords: ["starknet", "stark", "cairo", "zastrk"],
        title: "Starknet",
        category: "Layer 2",
        content: "A ZK-Rollup using 'STARKs' (Quantum resistant). Written in a custom language 'Cairo', not Solidity. High performance but harder for devs to adapt."
    },
    {
        keywords: ["blast", "yield", "blur", "pacman"],
        title: "Blast",
        category: "Layer 2",
        content: "An Optimistic Rollup with 'Native Yield'. ETH and Stablecoins held on Blast automatically earn staking yield (via Lido/Maker). Created by the Blur NFT team."
    },
    {
        keywords: ["polygon", "matic", "aggayer", "cdk"],
        title: "Polygon 2.0",
        category: "Layer 2",
        content: "Moving from a sidechain to a ZK-powered ecosystem. 'AggLayer' connects all chains securely. Polygon CDK allows anyone to build a ZK chain."
    },

    // ============================================
    // DEFI PROTOCOLS
    // ============================================
    {
        keywords: ["uniswap", "uni", "amm", "swap", "v3", "v4", "hooks"],
        title: "Uniswap",
        category: "DeFi",
        content: "The original AMM. V3 introduced Concentrated Liquidity. V4 is coming with 'Hooks' (custom logic for pools). The most forked protocol in history."
    },
    {
        keywords: ["aave", "lend", "borrow", "flash loan", "ghost"],
        title: "Aave",
        category: "DeFi",
        content: "Top Lending/Borrowing protocol. Popularized 'Flash Loans'. V3 introduced 'Portals' for cross-chain liquidity and Efficiency Mode."
    },
    {
        keywords: ["maker", "mkr", "dai", "stablecoin", "cdp"],
        title: "MakerDAO",
        category: "DeFi",
        content: "Issuer of DAI, the decentralized stablecoin. Users open CDPs (Collateralized Debt Positions) to mint DAI. Now rebranding to 'Sky' with the USDS stablecoin."
    },
    {
        keywords: ["lido", "ldo", "steth", "liquid staking"],
        title: "Lido",
        category: "DeFi",
        content: "Liquid Staking solution. You stake ETH and get 'stETH' (a receipt token) which you can use in DeFi while earning rewards. Controls ~30% of all staked ETH."
    },
    {
        keywords: ["curve", "crv", "stable swap", "ve", "bribe"],
        title: "Curve Finance",
        category: "DeFi",
        content: "Optimized for stablecoin swaps (USDT to USDC) with low slippage. Created the 'veToken' (Vote Escrow) model which powers the 'Curve Wars'."
    },
    {
        keywords: ["gmx", "perp", "leverage", "glp"],
        title: "GMX",
        category: "DeFi",
        content: "Decentralized Perpetual Exchange. Users trade against the GLP pool (a basket of assets). Arbitrum's flagship DeFi app."
    },
    {
        keywords: ["synthetix", "snx", "synth", "derivatives"],
        title: "Synthetix",
        category: "DeFi",
        content: "Liquidity layer for derivatives. Allows creation of 'Synths' (sUSD, sBTC, sGold). Powers frontends like Kwenta."
    },
    {
        keywords: ["pendle", "yield trading", "pt", "yt"],
        title: "Pendle",
        category: "DeFi",
        content: "Allows users to tokenize and trade yield. Splits assets into PT (Principal Token) and YT (Yield Token). Massive for 'Points trading'."
    },
    {
        keywords: ["jupiter", "jup", "aggregator", "solana"],
        title: "Jupiter",
        category: "DeFi",
        content: "The key liquidity aggregator on Solana. Routes trades through all DEXs for best price. Also offers Perps and DCA."
    },

    // ============================================
    // TECHNICAL STANDARDS
    // ============================================
    {
        keywords: ["erc20", "erc-20", "token standard"],
        title: "ERC-20",
        category: "Tech",
        content: "The standard interface for fungible tokens on Ethereum. Every token like UNI, LINK, PEPE is an ERC-20 contract."
    },
    {
        keywords: ["erc721", "erc-721", "nft"],
        title: "ERC-721",
        category: "Tech",
        content: "The standard for Non-Fungible Tokens (NFTs). Each token has a unique ID. Used for Bored Apes, Azukis, etc."
    },
    {
        keywords: ["erc1155", "erc-1155", "multi token"],
        title: "ERC-1155",
        category: "Tech",
        content: "Multi-Token standard. Can batch transfer fungible and non-fungible tokens in one transaction. Great for gaming items."
    },
    {
        keywords: ["erc4337", "account abstraction", "smart wallet"],
        title: "ERC-4337 (Account Abstraction)",
        category: "Tech",
        content: "Upgrades wallets to smart contracts. Enables: Gasless transactions, Social recovery, Batching, and Session keys."
    },
    {
        keywords: ["erc6551", "tba", "token bound account"],
        title: "ERC-6551 (Token Bound Accounts)",
        category: "Tech",
        content: "Gives every NFT its own wallet address. An NFT can now own tokens, other NFTs, or sign transactions. Example: An RPG character NFT that owns its sword and shield NFTs."
    },
    {
        keywords: ["erc4626", "vault", "yield"],
        title: "ERC-4626",
        category: "Tech",
        content: "Standardized 'Tokenized Vaults'. Makes it easy for apps to plug into yield sources (like Aave or Yearn) without custom code for each."
    },

    // ============================================
    // HISTORY & EVENTS
    // ============================================
    {
        keywords: ["dao hack", "ethereum classic", "etc", "fork"],
        title: "The DAO Hack (2016)",
        category: "History",
        content: "The first major DAO raised $150M and was hacked due to a reentrancy bug. Ethereum hard-forked to reverse the theft, creating 'Ethereum' (ETH) and preserving the hacked chain as 'Ethereum Classic' (ETC)."
    },
    {
        keywords: ["ico", "2017", "boom"],
        title: "ICO Boom (2017)",
        category: "History",
        content: "Initial Coin Offerings. Startups raised billions by selling whitepapers. 99% failed, but it birthed BNB, Chainlink, and Aave."
    },
    {
        keywords: ["defi summer", "2020", "compound", "yield farming"],
        title: "DeFi Summer (2020)",
        category: "History",
        content: "Triggered by Compound launching COMP tokens for liquidity mining. Yield farming went mainstream. YFI, UNI, SUSHI all launched here."
    },
    {
        keywords: ["luna", "ust", "do kwon", "spiral", "crash"],
        title: "Terra/Luna Crash (May 2022)",
        category: "History",
        content: "$40B wiped out in days. UST (algo stablecoin) lost peg. LUNA was minted infinitely to try to fix it, inflating supply from 300M to 6 Trillion. Triggered the bear market."
    },
    {
        keywords: ["ftx", "sbf", "alameda", "fraud"],
        title: "FTX Collapse (Nov 2022)",
        category: "History",
        content: "FTX (2nd largest exchange) was stealing user funds to plug holes in Alameda Research. SBF was arrested. 3AC, Voyager, Celsius, and BlockFi all collapsed in the contagion."
    },

    // ============================================
    // MARKET & TRADING
    // ============================================
    {
        keywords: ["rsi", "relative strength", "momentum"],
        title: "RSI (Relative Strength Index)",
        category: "Trading",
        content: "Momentum indicator. >70 is Overbought (Sell signal), <30 is Oversold (Buy signal)."
    },
    {
        keywords: ["fib", "fibonacci", "retracement"],
        title: "Fibonacci Retracement",
        category: "Trading",
        content: "Key support/resistance levels based on the golden ratio. Common levels: 0.382, 0.5, and 0.618 ('The Golden Pocket')."
    },
    {
        keywords: ["funding rate", "perp", "fees"],
        title: "Funding Rates",
        category: "Trading",
        content: "Periodic payments between longs and shorts to keep Perp price near Spot price. Positive funding = Longs pay Shorts (Bullish sentiment). Negative = Shorts pay Longs (Bearish)."
    },
    {
        keywords: ["oi", "open interest"],
        title: "Open Interest (OI)",
        category: "Trading",
        content: "Total number of open derivative contracts. Rising OI + Rising Price = Bullish Validation. Rising OI + Falling Price = Bearish Validation. Falling OI = Trend weakening."
    },
    {
        keywords: ["cvd", "cumulative volume delta"],
        title: "CVD (Cumulative Volume Delta)",
        category: "Trading",
        content: "Tracks the difference between buying and selling volume. Helps spot discrepancies (e.g., Price going up, but CVD going down means 'exhaustion' or lack of buyer demand)."
    },

    // ============================================
    // SECURITY
    // ============================================
    {
        keywords: ["reentrancy", "hack", "bug"],
        title: "Reentrancy Attack",
        category: "Security",
        content: "A contract calls an external contract, which calls back into the first contract before the first execution finishes. Used to drain funds (e.g., The DAO Hack, various DeFi hacks)."
    },
    {
        keywords: ["honeypot", "scam", "cant sell"],
        title: "Honeypot Scam",
        category: "Security",
        content: "A token you can buy but cannot sell. The code usually whitelists only the creator to sell."
    },
    {
        keywords: ["oracle manipulation", "flash loan attack"],
        title: "Oracle Manipulation",
        category: "Security",
        content: "Attacker uses a Flash Loan to pump a token price on a DEX, updates the price Oracle, and then takes a massive loan against the inflated collateral on a lending app."
    },
    {
        keywords: ["phishing", "drainer", "permit", "signature"],
        title: "Phishing / Wallet Drainers",
        category: "Security",
        content: "Fake websites tricking you to sign a 'Permit' or 'SetApprovalForAll'. Once signed, they drain your wallet without you sending a transaction."
    }
];

export const fallbackResponses = [
    "I have searched the Archives. My current database covers 100+ highly specific topics. Could you provide a Category? (e.g. 'Is that a Layer 1?', 'Is it a DeFi protocol?')",
    "Query unclear. I am trained on deep crypto lore, from the 2017 Block Size Wars to the latest ERC-6551 standards. Try using specific keywords.",
    "Accessing mempool... No exact match. Try asking about 'Security', 'Trading Indicators', or specific 'History' events."
];
