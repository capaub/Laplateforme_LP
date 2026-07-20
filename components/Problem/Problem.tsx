import { site } from "@/content/site";
import styles from "./Problem.module.css";

export default function Problem() {
    return (
        <section id="problem"
                 aria-labelledby="problem-title"
                 className={`${styles.problem} container`}>
            <h2 id="problem-title" className={styles.title}>{site.problem.title}</h2>
            <ul className={styles.items} role="list">
                {site.problem.items.map((item) => (
                    <li key={item} className={styles.item}>{item}</li>
                ))}
            </ul>
        </section>
    );
}