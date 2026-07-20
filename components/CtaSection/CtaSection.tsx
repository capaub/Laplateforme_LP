import { site } from "@/content/site";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./CtaSection.module.css";

export default function CtaSection() {
    return (
        <section className={`${styles.cta} container`} id="contact" aria-labelledby="contact-tilte">
            <h2 className={styles.title} id="contact-title">{site.cta.title}</h2>
            <p className={styles.intro}>{site.cta.intro}</p>
            <ContactForm />
        </section>
    );
}