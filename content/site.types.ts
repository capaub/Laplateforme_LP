export type Testimonial = {
    quote: string;
    author: string;
    role: string;
}

export type SiteContent = {
    name: string;
    url: string;
    tagLine: string;
    description: string;
    hero: { title: string; subtitle: string; ctaLabel: string };
    problem: { title: string; items: string[] };
    solution: { title: string; benefits: string[] };
    socialProof: { title: string; testimonials: Testimonial[] };
    footer: { companyName: string, email: string, phone: string };
    cta: { title: string; intro: string; formEndpoint: string };
    analytics: { gaId: string };
}