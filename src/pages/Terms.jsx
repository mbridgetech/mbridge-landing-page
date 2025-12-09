import { Link } from 'react-router-dom';

export default function Terms() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto leading-relaxed">
            <h1 className="text-3xl text-white font-bold mb-6">Terms of Service</h1>
            <p className="mb-4 text-brand-gray"><strong>Last Updated:</strong> December 2, 2025</p>

            <p className="mb-4 text-brand-gray">Please read these Terms of Service ("Terms") carefully before using the MBridge Technologies website and services.</p>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">1. Educational Purpose Only (Risk Disclosure)</h2>
            <p className="mb-4 font-bold text-white">Trading Forex, Stocks, and Commodities involves a high level of risk and may not be suitable for all investors. You could lose some or all of your initial investment.</p>
            <p className="mb-4 text-brand-gray">MBridge Technologies provides tools and education for informational purposes only. Nothing on this site constitutes financial, investment, or trading advice. We are not a broker or financial advisor.</p>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">2. Cryptocurrency Policy</h2>
            <p className="mb-4 text-brand-gray">We do not offer services, signals, or tools related to cryptocurrency trading. Any mention of markets refers strictly to regulated Forex and Stock markets.</p>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">3. Refunds</h2>
            <p className="mb-4 text-brand-gray">Digital products (software access, downloadable courses) are generally non-refundable once accessed, due to the nature of digital goods. However, we review refund requests on a case-by-case basis.</p>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">4. Intellectual Property</h2>
            <p className="mb-4 text-brand-gray">All content, calculators, and code provided by MBridge Technologies are our intellectual property. You may not resell, redistribute, or reverse engineer our tools.</p>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">5. Governing Law</h2>
            <p className="mb-4 text-brand-gray">These terms are governed by the laws of England and Wales.</p>

            <div className="mt-12 pt-8 border-t border-white/10">
                <Link to="/" className="text-brand-teal hover:text-white transition-colors">&larr; Back to Home</Link>
            </div>
        </div>
    );
}
