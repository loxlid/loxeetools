import { NewsItem } from '@/lib/news';
import styles from './NewsFeed.module.css';

const NewsFeed = ({ news }: { news: NewsItem[] }) => {
    return (
        <div className={styles.container}>
            {news.map((item, idx) => (
                <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
                    <div className={styles.source}>{item.source}</div>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.snippet}>{item.contentSnippet}</p>
                    <div className={styles.date} suppressHydrationWarning>{item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US') : ''}</div>
                </a>
            ))}
        </div>
    );
};

export default NewsFeed;
