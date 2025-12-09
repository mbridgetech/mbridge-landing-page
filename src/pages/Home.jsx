import Hero from '../components/Hero';
import RiskCalculator from '../components/RiskCalculator';
import AIValidator from '../components/AIValidator';
import Features from '../components/Features';
import Pricing from '../components/Pricing';

export default function Home() {
    return (
        <>
            <Hero />
            <RiskCalculator />
            <AIValidator />
            <Features />
            <Pricing />
        </>
    );
}
