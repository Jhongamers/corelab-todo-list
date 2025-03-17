import styles from '@/components/Header/Header.module.scss';
import Image from 'next/image';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <a href="#" className={styles.logo}>
                    <Image src="/assets/logo2.svg" alt="Logo" width={32} height={32} className={styles.logoIcon} />
                    CoreNotes
                </a>
                <div className={styles.searchBar}>
                    <input type="text" className={styles.searchInput} placeholder="Pesquisar notas" />
                    <span>🔍</span>
                </div>
            </div>
            <button className={styles.closeBtn}>x</button>
        </header>
    )
}

export default Header;