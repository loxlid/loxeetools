import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    loxeetools
                </Link>
                <div className={styles.links}>
                    {/* Market, News, Signals removed */}
                </div>
                <div className={styles.actions}>
                    <Link href="/ai" className={styles.aiLink}>AI Assistant ✨</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
