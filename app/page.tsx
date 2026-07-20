import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Problem from "@/components/Problem/Problem";
import Solution from "@/components/Solution/Solution";
import SocialProof from "@/components/SocialProof/SocialProof";
import CtaSection from "@/components/CtaSection/CtaSection";
import Footer from "@/components/Footer/Footer";


export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Problem />
                <Solution />
                <SocialProof />
                <CtaSection />
            </main>
            <Footer />
        </>
    )
}