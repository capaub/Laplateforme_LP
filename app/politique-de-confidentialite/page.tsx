import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
    title: "Politique de confidentialité",
    robots: { index: false },
};

export default function PolitiqueDeConfidentialite() {
    return (
        <main className={`${styles.legal} container`}>
            <h1>Politique de confidentialité</h1>

            <h2>Responsable du traitement</h2>
            <p>
                {site.footer.companyName} — [ ADRESSE ] —{" "}
                <a href={`mailto:${site.footer.email}`}>{site.footer.email}</a>
            </p>

            <h2>Données collectées et finalité</h2>
            <p>
                Le formulaire de contact collecte votre nom et votre adresse email,
                dans le seul but de répondre à votre demande et de vous recontacter.
                Base légale : votre consentement (case à cocher). Aucune donnée n'est
                transmise à des tiers à des fins commerciales.
            </p>

            <h2>Destinataire et sous-traitant</h2>
            <p>
                Les données sont traitées via Brevo (société française, données
                hébergées dans l'Union européenne), notre outil de gestion des
                contacts. Voir la politique de confidentialité de Brevo.
            </p>

            <h2>Durée de conservation</h2>
            <p>
                Vos données sont conservées [ DURÉE, ex. : 3 ans après le dernier
                contact ], puis supprimées.
            </p>

            <h2>Vos droits</h2>
            <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de
                rectification, d'effacement et d'opposition. Pour l'exercer :{" "}
                <a href={`mailto:${site.footer.email}`}>{site.footer.email}</a>. Chaque
                email envoyé contient par ailleurs un lien de désinscription. Vous
                pouvez introduire une réclamation auprès de la CNIL (cnil.fr).
            </p>

            <h2>Cookies et mesure d'audience</h2>
            <p>
                Avec votre consentement, ce site utilise Google Analytics (Google
                Ireland Ltd / Google LLC — vos données peuvent être transférées hors
                de l'Union Européenne) afin de mesurer son audience et d'améliorer
                son contenu. Aucun traceur n'est déposé sans votre accord, et vous
                pouvez naviguer normalement en le refusant. Votre choix est conservé
                six mois, puis redemandé. Vous pouvez le modifier à tout moment via
                le bouton « Gérer mes cookies » en bas de page.
            </p>

            <p>
                <Link href="/">← Retour à l'accueil</Link>
            </p>
        </main>
    );
}