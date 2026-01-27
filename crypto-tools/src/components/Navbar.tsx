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
                    <Link href="/" className={styles.link}>Market</Link>
                    <Link href="/news" className={styles.link}>News</Link>
                    <Link href="/signals" className={styles.link}>Signals</Link>
                </div>
                <div className={styles.actions}>
                    {/* Wallet Connect removed */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
