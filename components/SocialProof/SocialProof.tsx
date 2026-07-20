import { site } from "@/content/site";
import styles from "./SocialProof.module.css";

export default function SocialProof() {
    return (
        <section id="social-proof"
                 aria-labelledby="social-proof-title"
                 className={`${styles.socialProof} container`}>
            <h2 id="social-proof-title" className={styles.title}>{site.socialProof.title}</h2>
            <div className={styles.items}>
                {site.socialProof.testimonials.map((testimonial) => (
                    <figure key={testimonial.author} className={styles.card}>
                        <blockquote className={styles.quote}>
                            <p>{testimonial.quote}</p>
                        </blockquote>
                        <figcaption className={styles.caption}>{testimonial.author} - {testimonial.role}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}