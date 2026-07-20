import { site } from "@/content/site";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav aria-label="Navigation principale" className={`${styles.nav} container`}>
                <a href="#hero" className={styles.brand}>{site.name}</a>
                <ul className={styles.links} role="list">
                    <li><a href="#problem">Le problème</a></li>
                    <li><a href="#solution">La solution</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}