import { XMLParser } from 'fast-xml-parser';

export interface NewsItem {
    title?: string;
    link?: string;
    pubDate?: string;
    contentSnippet?: string;
    source?: string;
}

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
});

function stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
}

export async function fetchNews(): Promise<NewsItem[]> {
    try {
        const res = await fetch('https://cointelegraph.com/rss', { next: { revalidate: 300 } });
        if (!res.ok) throw new Error('Failed to fetch RSS');
        const text = await res.text();
        const feed = parser.parse(text);

        // Cointelegraph uses standard RSS 2.0: rss -> channel -> item[]
        const items = feed?.rss?.channel?.item || [];

        // Ensure it's an array (xml parser might return single object if only one item)
        const itemsArray = Array.isArray(items) ? items : [items];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return itemsArray.slice(0, 6).map((item: any) => {
            const title = item.title;
            const link = item.link;
            const pubDate = item.pubDate;
            // Description is usually the summary
            const description = item.description || '';

            // Decode HTML entities if necessary (fast-xml-parser decodes default entities usually)
            // Strip HTML tags for clean snippet
            const contentSnippet = stripHtml(description).slice(0, 150) + '...';

            return {
                title,
                link,
                pubDate,
                contentSnippet,
                source: 'CoinTelegraph'
            };
        });

    } catch (err) {
        console.error("News Fetch Error:", err);
        // Fallback or empty
        return [
            {
                title: "Bitcoin breaks new resistance levels as market surges",
                link: "#",
                pubDate: new Date().toISOString(),
                contentSnippet: "Market analysts predict a strong bull run...",
                source: "System"
            },
            {
                title: "New regulations impacting DeFi protocols explained",
                link: "#",
                pubDate: new Date().toISOString(),
                contentSnippet: "The latest regulatory framework...",
                source: "System"
            }
        ];
    }
}
