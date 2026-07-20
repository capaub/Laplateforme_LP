import { site } from "@/content/site";
import styles from "./Footer.module.css";
import Link from "next/link";
import ManageConsentButton from "@/components/ManageConsentButton/ManageConsentButton";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.inner}`}>
                <p className={styles.brand}>{site.footer.companyName}</p>
                <ul className={styles.contacts} >
                    <li><a href={`tel:${site.footer.phone}`}>Tel: {site.footer.phone}</a></li>
                    <li><a href={`mailto:${site.footer.email}`}>Email: {site.footer.email}</a></li>
                </ul>
                <ul className={styles.links} role="list">
                    <li><Link href="/mentions-legales">Mentions légales</Link></li>
                    <li><Link href="/politique-de-confidentialite">Politique de confidentialité</Link></li>
                    <li><ManageConsentButton /></li>
                </ul>
            </div>
        </footer>
    );
}