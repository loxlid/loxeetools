import AIChat from '@/components/AIChat';
import Navbar from '@/components/Navbar';
import styles from './ai.module.css';

export default function AIPage() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.contentWrapper}>
                <AIChat />
            </div>
        </main>
    );
}
