
export interface KnowledgeItem {
    keywords: string[];
    title: string;
    category: 'Layer 1' | 'Layer 2' | 'DeFi' | 'Tech' | 'History' | 'Trading' | 'Security' | 'NFT/Gaming' | 'Infrastructure' | 'Privacy' | 'Memecoins' | 'RWA' | 'DeSci' | 'Other';
    content: string;
}

export const cryptoKnowledge: KnowledgeItem[] = [
    // ============================================
    // LAYER 1 BLOCKCHAINS (The Foundation)
    // ============================================
    {
        keywords: ["bitcoin", "btc", "satoshi", "nakamoto", "pow", "halving", "taproot", "ordinals", "runes"],
        title: "Bitcoin (BTC)",
        category: "Layer 1",
        content: "Bitcoin is the first decentralized cryptocurrency (2009). It uses Proof-of-Work. Key events: The Halving (every 4 years), SegWit (2017), Taproot (2021). Innovation has returned with Ordinals (NFTs on BTC) and Runes (Tokens)."
    },
    {
        keywords: ["ethereum", "eth", "vitalik", "smart contract", "evm", "merge", "dencun", "blobs"],
        title: "Ethereum (ETH)",
        category: "Layer 1",
        content: "The leading smart contract platform. Proof-of-Stake. Powers most DeFi/NFTs. Recent upgrades: 'Dencun' (EIP-4844) introduced 'Blobs' to drastically lower L2 fees. Roadmap: The Surge (Scaling), The Scourge, The Verge."
    },
    {
        keywords: ["solana", "sol", "poh", "firedancer", "monolithic", "svm"],
        title: "Solana (SOL)",
        category: "Layer 1",
        content: "High-performance L1 (65k TPS). Uses Proof-of-History. 'Firedancer' is a new validator client built by Jump Crypto to boost speed to 1M TPS. It is the home of 'DePIN' and memecoins."
    },
    {
        keywords: ["cardano", "ada", "hoskinson", "eutxo", "peer review", "midnight"],
        title: "Cardano (ADA)",
        category: "Layer 1",
        content: "Research-driven blockchain. eUTXO model. Hard forks like 'Chang' are moving it towards on-chain governance (Voltaire era). Also building 'Midnight', a privacy partner chain."
    },
    {
        keywords: ["sui", "mysten", "move", "object centric", "walrus"],
        title: "Sui",
        category: "Layer 1",
        content: "L1 using 'Move' lang. Object-Centric model allows parallel execution. 'Walrus' is their decentralized storage protocol. Known for sub-second latency."
    },
    {
        keywords: ["aptos", "apt", "move", "block-stm"],
        title: "Aptos",
        category: "Layer 1",
        content: "L1 using 'Move' and Block-STM for parallel execution. Partnered with Microsoft for AI integration. Focuses on enterprise adoption."
    },
    {
        keywords: ["sei", "trading", "orderbook", "parallel", "v2"],
        title: "Sei",
        category: "Layer 1",
        content: "The first parallelized EVM blockchain. Optimized for trading with a native order matching engine. Sei v2 added full EVM compatibility."
    },
    {
        keywords: ["ton", "telegram", "open network", "sharding", "hamster"],
        title: "TON (The Open Network)",
        category: "Layer 1",
        content: "Integrated into Telegram (900M users). Uses dynamic sharding. Home to viral 'Tap-to-Earn' games like Hamster Kombat and Notcoin. The ultimate Web3 on-ramp."
    },
    {
        keywords: ["near", "sharding", "nightshade", "chain abstraction", "ai"],
        title: "NEAR Protocol",
        category: "Layer 1",
        content: "Focuses on 'Chain Abstraction' (one account for all chains) and AI (Near.AI). Uses Nightshade sharding for infinite scaling."
    },
    {
        keywords: ["fantom", "ftm", "sonic", "dag", "$s"],
        title: "Sonic (Fantom)",
        category: "Layer 1",
        content: "Fantom rebranded to Sonic ($S). A new high-performance L1 connecting to Ethereum via a massive L2 bridge. 10k TPS with 1s finality."
    },
    {
        keywords: ["bsc", "bnb", "binance", "opbnb"],
        title: "BNB Chain",
        category: "Layer 1",
        content: "Binance's ecosystem. Includes BSC (L1), opBNB (L2), and Greenfield (Storage). Highly centralized but extremely cheap and popular in emerging markets."
    },
    {
        keywords: ["avalanche", "avax", "subnets", "firewood"],
        title: "Avalanche",
        category: "Layer 1",
        content: "Network of custom 'Subnets'. 'Firewood' is their new database engine. Partnered with heavyweights like JP Morgan and AWS for institutional subnets."
    },
    {
        keywords: ["kaspa", "kas", "blockdag", "ghostdag", "pow", "krc20"],
        title: "Kaspa",
        category: "Layer 1",
        content: "The fastest Proof-of-Work chain using BlockDAG. No blocks, just a DAG of transactions by the second. Launched KRC-20 tokens recently."
    },
    {
        keywords: ["monad", "parallel evm", "keone"],
        title: "Monad",
        category: "Layer 1",
        content: "Highly anticipated L1. Parallel EVM with 10k TPS. Rebuilt the EVM from scratch (MonadDb) to optimize state access. 'Solana speed with Ethereum compatibility'."
    },
    {
        keywords: ["bera", "berachain", "pol", "proof of liquidity"],
        title: "Berachain",
        category: "Layer 1",
        content: "EVM-compatible chain built on Cosmos SDK. Uses 'Proof of Liquidity' consensus where validators must provide liquidity to dApps. Cult-like community."
    },

    // ============================================
    // LAYER 2 & SCALING
    // ============================================
    {
        keywords: ["arbitrum", "arb", "optimistic", "rollup", "stylus"],
        title: "Arbitrum",
        category: "Layer 2",
        content: "TVL Leader. 'Stylus' upgrade allows writing contracts in Rust/C++. Planning 'Orbit' chains (L3s)."
    },
    {
        keywords: ["optimism", "op", "superchain", "interop"],
        title: "Optimism",
        category: "Layer 2",
        content: "Building the 'Superchain' - a network of interconnected L2s (Base, Zora, Mode) sharing a bridge and sequencer."
    },
    {
        keywords: ["base", "coinbase", "smart wallet"],
        title: "Base",
        category: "Layer 2",
        content: "Coinbase's L2. The home of 'SocialFi' (Friend.tech) and retail meme trading. Heavily integrated with Coinbase Smart Wallet."
    },
    {
        keywords: ["zksync", "zk", "matter labs", "elastic chain"],
        title: "ZKsync",
        category: "Layer 2",
        content: "ZK Rollup. Transitioning to 'Elastic Chain' architecture (similar to Superchain/Polygon AggLayer). Native Account Abstraction."
    },
    {
        keywords: ["starknet", "stark", "cairo", "game"],
        title: "Starknet",
        category: "Layer 2",
        content: "The 'Math' chain. Uses ZK-STARKs. Logic written in Cairo. Very popular for fully on-chain games (Dojo engine)."
    },
    {
        keywords: ["blast", "yield", "blur", "pacman"],
        title: "Blast",
        category: "Layer 2",
        content: "Native Yield L2. 4-5% on ETH/Stablecoins just by holding. Home to 'degens' and points farming."
    },
    {
        keywords: ["polygon", "matic", "pol", "agglayer", "cdk", "zkevm"],
        title: "Polygon (Polygon 2.0)",
        category: "Layer 2",
        content: "Rebranded MATIC to POL. 'AggLayer' aggregates ZK proofs from many chains to create a unified liquidity layer. Polygon CDK powers many L2s (Astar, Immutable)."
    },
    {
        keywords: ["mantle", "mnt", "treasury", "ethna"],
        title: "Mantle",
        category: "Layer 2",
        content: "Modular L2 using EigenDA for data availability. Has one of the largest treasuries ($2B+) to fund ecosystem."
    },
    {
        keywords: ["linea", "consensys", "metamask"],
        title: "Linea",
        category: "Layer 2",
        content: "ZK L2 built by ConsenSys (Metamask creators). Heavily integrated into Metamask wallet."
    },
    {
        keywords: ["scroll", "zkevm", "bytecode"],
        title: "Scroll",
        category: "Layer 2",
        content: "Bytecode-level compatible ZK-EVM. Prioritizes 'Ethereum alignment' and open source values covering proof markets."
    },

    // ============================================
    // INFRASTRUCTURE & MODULAR
    // ============================================
    {
        keywords: ["celestia", "tia", "data availability", "da", "modular"],
        title: "Celestia",
        category: "Infrastructure",
        content: "The first Data Availability (DA) layer. 'Blobstream' allows L2s to post data to Celestia instead of Ethereum, saving 99% on fees. 'Modular Money'."
    },
    {
        keywords: ["eigenlayer", "restaking", "avs", "points"],
        title: "EigenLayer",
        category: "Infrastructure",
        content: "Introduced 'Restaking'. Allows ETH stakers to secure other protocols (AVSs - Actively Validated Services) like Oracle networks or Bridges for extra yield."
    },
    {
        keywords: ["layerzero", "zro", "omnichain", "bridge", "stargate"],
        title: "LayerZero",
        category: "Infrastructure",
        content: "Interoperability protocol. Allows sending messages (tokens) between blockchains. Powers 'Stargate' bridge. OFT standard allows tokens to move natively across chains."
    },
    {
        keywords: ["wormhole", "w", "bridge", "portal"],
        title: "Wormhole",
        category: "Infrastructure",
        content: "Cross-chain messaging protocol. Major competitor to LayerZero. Used heavily by Solana ecosystem."
    },
    {
        keywords: ["pyth", "oracle", "pull"],
        title: "Pyth Network",
        category: "Infrastructure",
        content: "High-speed Oracle. Uses a 'Pull' model (apps request price updates) vs Chainlink's 'Push'. Dominant on Solana and high-speed chains."
    },
    {
        keywords: ["chainlink", "link", "ccip", "oracle", "data feed"],
        title: "Chainlink",
        category: "Infrastructure",
        content: "The industry standard Oracle. 'CCIP' (Cross-Chain Interoperability Protocol) allows banks (Swift) to connect to blockchain."
    },
    {
        keywords: ["the graph", "grt", "subgraph", "indexing"],
        title: "The Graph",
        category: "Infrastructure",
        content: "The 'Google of Blockchain'. Indexes on-chain data so apps can query it via GraphQL APIs (Subgraphs)."
    },
    {
        keywords: ["filecoin", "fil", "storage", "ipfs"],
        title: "Filecoin",
        category: "Infrastructure",
        content: "Decentralized storage network. An incentive layer for IPFS. Alternatives: Arweave (Permanent storage)."
    },
    {
        keywords: ["arweave", "ar", "permaweb", "ao"],
        title: "Arweave (AO)",
        category: "Infrastructure",
        content: "Permanent storage. 'AO' is a new hyper-parallel computer built on top of Arweave, aiming to compete with Solana/Ethereum."
    },

    // ============================================
    // DEFI & TRADING
    // ============================================
    {
        keywords: ["uniswap", "uni", "amm", "swap", "v4", "hooks"],
        title: "Uniswap",
        category: "DeFi",
        content: "Top AMM. V4 introduces 'Hooks' (custom logic) and 'Singleton' contract for gas efficiency."
    },
    {
        keywords: ["aave", "gho", "lend", "flash loan"],
        title: "Aave",
        category: "DeFi",
        content: "Top Lender. Emitted 'GHO' stablecoin. V4 plans for a unified liquidity layer."
    },
    {
        keywords: ["ethena", "ena", "usde", "delta neutral", "yield"],
        title: "Ethena",
        category: "DeFi",
        content: "Issuer of USDe, a 'synthetic dollar'. Backed by Delta Neutral hedge (Long ETH Spot + Short ETH Perp) to earn funding rates. High yield, higher risk."
    },
    {
        keywords: ["jupiter", "jup", "perps", "launchpad", "lfg"],
        title: "Jupiter",
        category: "DeFi",
        content: "Solana's grand aggregator. Swap, Limit Orders, DCA, Perps, and Launchpad (LFG). 80% of Solana volume flows through it."
    },
    {
        keywords: ["pendle", "pt", "yt", "yield trading"],
        title: "Pendle",
        category: "DeFi",
        content: "Yield tokenization. Splits assets into Principal (PT) and Yield (YT). Used to speculate on points/yield (e.g., buying YT-eETH to 10x leverage points)."
    },
    {
        keywords: ["blur", "nft marketplace", "blend"],
        title: "Blur",
        category: "DeFi",
        content: "Pro NFT marketplace. 'Blend' protocol allows NFT lending/borrowing (BNPL for NFTs)."
    },
    {
        keywords: ["aerodrome", "aero", "base", "ve33"],
        title: "Aerodrome",
        category: "DeFi",
        content: "The central liquidity hub on Base. Uses Ve(3,3) mechanics (fork of Solidly/Velodrome)."
    },

    // ============================================
    // MEMECOINS (Culture)
    // ============================================
    {
        keywords: ["doge", "dogecoin", "elon", "shib"],
        title: "Dogecoin (DOGE)",
        category: "Memecoins",
        content: "The original memecoin (2013). Proof of Work (merged mined with Litecoin). Elon Musk's favorite."
    },
    {
        keywords: ["pepe", "frog", "rare"],
        title: "Pepe (PEPE)",
        category: "Memecoins",
        content: "The king of Ethereum memes. 'Feels Good Man'. Launched in 2023 and flipped SHIB in volume."
    },
    {
        keywords: ["wif", "dogwifhat", "hat", "solana meme"],
        title: "dogwifhat (WIF)",
        category: "Memecoins",
        content: "The mascot of Solana's 2024 run. It's literally a dog wif a hat. Community raised money to put it on the Las Vegas Sphere."
    },
    {
        keywords: ["bonk", "solana", "utility meme"],
        title: "Bonk",
        category: "Memecoins",
        content: "The first Solana dog coin. Airdropped to devs/artists after FTX crash to revive the chain. Has trading bots and utility."
    },
    {
        keywords: ["brett", "base", "pepe friend"],
        title: "Brett",
        category: "Memecoins",
        content: "The mascot of Base chain. Based on Matt Furie's 'Boys Club' comic (Pepe's best friend)."
    },
    {
        keywords: ["mog", "culture", "cat"],
        title: "Mog Coin (MOG)",
        category: "Memecoins",
        content: "First culture coin on ETH. 'Mogging' stands for dominating. Community uses '🫵😹' emoji."
    },

    // ============================================
    // RWA (Real World Assets)
    // ============================================
    {
        keywords: ["ondo", "ousg", "treasuries", "yield"],
        title: "Ondo Finance",
        category: "RWA",
        content: "Tokenized US Treasuries. Allows stablecoin holders to earn risk-free 'real world' yield on-chain. Partners with BlackRock."
    },
    {
        keywords: ["blackrock", "buidl", "fund"],
        title: "BlackRock BUIDL",
        category: "RWA",
        content: "BlackRock's tokenized fund on Ethereum. $500M+ AUM. Used as collateral in DeFi (Ondo, FalconX)."
    },
    {
        keywords: ["centrifuge", "cfg", "credit"],
        title: "Centrifuge",
        category: "RWA",
        content: "On-chain credit. Businesses tokenize invoices/assets to borrow stablecoins from DeFi liquidity."
    },

    // ============================================
    // DeSci (Decentralized Science)
    // ============================================
    {
        keywords: ["desci", "science", "research"],
        title: "DeSci (General)",
        category: "DeSci",
        content: "Using crypto rails to fund and govern scientific research. IP (Intellectual Property) is tokenized as IPT-NFTs."
    },
    {
        keywords: ["vita", "vitadao", "longevity"],
        title: "VitaDAO",
        category: "DeSci",
        content: "Funds longevity/aging research. Funded by Pfizer. Token holders own the IP rights to discovered drugs."
    },
    {
        keywords: ["pump.science", "pump", "experiments"],
        title: "Pump.science",
        category: "DeSci",
        content: "Gamified DeSci. Users verify longevity supplements on worms/flies streamed live. Tokens represent the success of the experiment."
    },

    // ============================================
    // PRIVACY
    // ============================================
    {
        keywords: ["tornado", "cash", "mixer", "ofac"],
        title: "Tornado Cash",
        category: "Privacy",
        content: "Decentralized mixer on Ethereum. Breaks the on-chain link between sender and receiver. Sanctioned by US OFAC, but the code is immutable."
    },
    {
        keywords: ["railgun", "rail", "shielded"],
        title: "Railgun",
        category: "Privacy",
        content: "Smart contract system for private DeFi usage. Allows users to interact with Uniswap/Aave privately using zk-SNARKs."
    },
    {
        keywords: ["zama", "fhe", "homomorphic", "encryption"],
        title: "Zama",
        category: "Privacy",
        content: "Open source cryptography company building Fully Homomorphic Encryption (FHE) for blockchain. FHE allows computation on encrypted data without decrypting it. Powering the 'HTTPZ' protocol."
    },
    {
        keywords: ["octra", "fhe", "hypergraph"],
        title: "Octra",
        category: "Layer 1",
        content: "A high-perfomance FHE blockchain. Uses 'Hypergraph' technology to enable confidential computing at scale. Competitor to Fhenix and Inco."
    },
    {
        keywords: ["fhenix", "fhe", "rollup"],
        title: "Fhenix",
        category: "Layer 2",
        content: "The first FHE-powered Layer 2. Brings confidentiality to Ethereum smart contracts. Uses Zama's technology."
    }
];

export const fallbackResponses = [
    "I have searched the Archives. My current database covers 100+ topics including L1s, L2s, DeFi, Memecoins, and RWA. Could you provide a specific keyword? (e.g., 'WIF', 'EigenLayer', 'Ondo')",
    "Query unclear. I am trained on deep crypto lore, from Satoshi to the latest Solana memecoins. Try asking 'What is DeSci?' or 'Explain Restaking'.",
    "Accessing mempool... No exact match. I can explain Trading, History, Tech, or specific projects. Try searching for a ticker symbol like 'ENA' or 'TIA'."
];
