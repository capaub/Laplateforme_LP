"use client";

import { useState } from "react";
import { site } from "@/content/site";
import styles from "./ContactForm.module.css";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  consent?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [status, setStatus] = useState<Status>("idle");

    function validate(): FieldErrors {
        const found: FieldErrors = {};
        if (name.trim().length < 3) {
            found.name = "Veuiller indiquer votre nom (3 caractères minimum)";
        }
        if (!EMAIL_PATTERN.test(email)) {
            found.email = "Veuillez indiquer une adresse email valide";
        }
        if (!consent) {
            found.consent = "Votre consentement est nécessaire pour vous recontacter.";
        }
        return found;
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const found = validate();
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        if (!site.cta.formEndpoint) {
            setStatus("error");
            return;
        }

        setStatus("submitting");
        try {
            const body = new URLSearchParams({ NOM: name, EMAIL: email, email_address_check: "" });
            const response = await fetch(site.cta.formEndpoint, {
                method: "POST",
                body,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            setStatus("success");
            } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <p className={styles.success} role="status">
                Merci ! Votre demande a bien été envoyée, vérifiez votre boîte mail pour confirmer votre adresse.
            </p>
        );
    }

    return (
        <form className={styles.form}
              onSubmit={handleSubmit}
              noValidate>
            <input className={styles.honeypot}
                   type="text"
                   name="email_addres_check"
                   defaultValue=""
                   tabIndex={-1}
                   autoComplete="off"
                   aria-hidden="true"
            />
            <div className={styles.field}>
                <label htmlFor="contact-name">Votre nom</label>
                <input id="contact-name"
                       name="NOM"
                       type="text"
                       autoComplete="name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       aria-invalid={Boolean(errors.name)}
                       aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && (
                    <p className={styles.error} id="contact-name-error">{errors.name}</p>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="contact-email">Votre email</label>
                <input id="contact-email"
                       name="EMAIL"
                       type="email"
                       autoComplete="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       aria-invalid={Boolean(errors.email)}
                       aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && (
                    <p className={styles.error} id="contact-email-error">{errors.email}</p>
                )}
            </div>

            <div className={styles.consent}>
                <input id="contact-consent"
                       type="checkbox"
                       checked={consent}
                       onChange={(e) => setConsent(e.target.checked)}
                       aria-invalid={Boolean(errors.consent)}
                       aria-describedby={errors.consent ? "contact-consent-error" : undefined}
                />
                <label htmlFor="contact-consent">
                    J'accepte que mes données soient utilisées pour être recontacté·e.
                    Voir notre <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
                </label>
            </div>
            {errors.consent && (
                <p className={styles.error} id="contact-consent-error">{errors.consent}</p>
            )}

            <button className={styles.submit}
                    type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Envoi en cours..." : "Envoyer ma deamnde"}
            </button>

            {status === "error" && (
                <p className={styles.formError} role="alert">L'envoi a échoué. Réessayez dans un instant ou écrivez-nous directement.
                </p>
            )}
        </form>
    );
}

