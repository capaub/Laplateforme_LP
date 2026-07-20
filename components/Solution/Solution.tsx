import { site } from "@/content/site";
import styles from "./Solution.module.css";

export default function Solution() {
    return (
        <section id="solution"
                 aria-labelledby="solution-title"
                 className={`${styles.solution} container`}>
            <h2 id="solution-title" className={styles.title}>{site.solution.title}</h2>
            <ul className={styles.items} role="list">
                {site.solution.benefits.map((item) => (
                    <li key={item} className={styles.item}>{item}</li>
                ))}
            </ul>
        </section>
    );
}