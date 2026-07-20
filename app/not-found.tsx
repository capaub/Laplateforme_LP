import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <main className={`${styles.notFound} container`}>
            <h1>Page introuvable</h1>
            <p>La page que vous chercher n'existe pas ou ou n'existe plus.</p>
            <Link className={styles.back} href="/">
                Retour à l'accueil
            </Link>
        </main>
    );
}