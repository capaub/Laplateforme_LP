"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import styles from "./ConsentBanner.module.css";
import Link from "next/link";

type Consent = "unknown" | "granted" | "denied";

const STORAGE_KEY = "consent-analytics";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182; // ~6 months (CNIL recommendation)

export default function ConsentBanner() {
    const [consent, setConsent] = useState<Consent>("unknown");

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const saved = JSON.parse(raw) as { value: Consent; at: number };
            if (Date.now() - saved.at < MAX_AGE_MS) {
                setConsent(saved.value);
            } else {
                localStorage.removeItem(STORAGE_KEY); // expired: ask again
            }
        } catch {
            // corrupted storage: keep "unknown", the banner will show
        }
    }, []);

    function choose(value: "granted" | "denied") {
        setConsent(value);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: Date.now() }));
    }

    if (!site.analytics.gaId) return null;

    return (
        <>
            {consent === "granted" && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${site.analytics.gaId}');
          `}</Script>
                </>
            )}

            {consent === "unknown" && (
                <section className={styles.banner} aria-label="Gestion des cookies">
                    <p className={styles.text}>
                        Nous souhaitons mesurer l'audience de ce site (Google Analytics)
                        pour l'améliorer. Vos données ne sont utilisées qu'avec votre
                        accord.{" "}
                        <Link href="/politique-de-confidentialite">En savoir plus</Link>
                    </p>
                    <div className={styles.actions}>
                        <button className={styles.button} onClick={() => choose("denied")}>
                            Refuser
                        </button>
                        <button className={styles.button} onClick={() => choose("granted")}>
                            Accepter
                        </button>
                    </div>
                </section>
            )}
        </>
    );
}