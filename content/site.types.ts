export type Testimonial = {
    quote: string;
    author: string;
    role: string;
}

export type SiteContent = {
    theme: {
        primary: string;
        primaryHover: string,
        text: string,
        textMuted: string,
        background: string,
        surface: string
    },
    name: string;
    url: string;
    tagLine: string;
    description: string;
    hero: { title: string; subtitle: string; ctaLabel: string };
    problem: { title: string; items: string[] };
    solution: { title: string; benefits: string[] };
    socialProof: { title: string; testimonials: Testimonial[] };
    cta: { title: string; intro: string; formEndpoint: string };
    footer: { companyName: string, email: string, phone: string };
    analytics: { gaId: string };
}