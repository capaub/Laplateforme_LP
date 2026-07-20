import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
    title: "Mentions légales",
    robots: { index: false },
};

export default function MentionsLegales() {
    return (
        <main className={`${styles.legal} container`}>
            <h1>Mentions légales</h1>

            <h2>Éditeur du site</h2>
            <p>
                {site.footer.companyName} — [ FORME JURIDIQUE, CAPITAL ]<br />
                [ ADRESSE DU SIÈGE ]<br />
                SIRET : [ SIRET ] — Directeur de la publication : [ NOM ]<br />
                Contact : <a href={`mailto:${site.footer.email}`}>{site.footer.email}</a>
            </p>

            <h2>Hébergement</h2>
            <p>
                [ NOM DE L'HÉBERGEUR ]<br />
                [ ADRESSE DE L'HÉBERGEUR ]<br />
                [ SITE / TÉLÉPHONE DE L'HÉBERGEUR ]
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
                L'ensemble des contenus de ce site (textes, images, logo) est la
                propriété exclusive de {site.footer.companyName}, sauf mention
                contraire. Toute reproduction sans autorisation est interdite.
            </p>

            <p>
                <Link href="/">← Retour à l'accueil</Link>
            </p>
        </main>
    );
}