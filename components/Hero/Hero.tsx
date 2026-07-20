import { site } from "@/content/site";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section id="hero"
                 aria-labelledby="hero-title"
                 className={`${styles.hero} container`}>
            <h1 id="hero-title" className={styles.title}>{site.hero.title}</h1>
            <p className={styles.subtitle}>{site.hero.subtitle}</p>
            <a href="#contact" className={styles.cta}>{site.hero.ctaLabel}</a>
        </section>
    )
}