import { Link } from 'react-router-dom';

export default function Privacy() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto leading-relaxed">
            <h1 className="text-3xl text-white font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4 text-brand-gray"><strong>Effective Date:</strong> December 2, 2025</p>

            <p className="mb-4 text-brand-gray">MBridge Technologies ("we", "us", or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.</p>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">1. Information We Collect</h2>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-brand-gray">
                <li><strong>Personal Information:</strong> When you purchase our products, we collect your email address and name to deliver the services.</li>
                <li><strong>Payment Information:</strong> Payments are processed securely by our Merchant of Record, Lemon Squeezy. We do not store your credit card details on our servers.</li>
                <li><strong>Usage Data:</strong> We may collect anonymous data on how you use our web apps to improve functionality.</li>
            </ul>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4 text-brand-gray">We use your data to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-brand-gray">
                <li>Provide access to our trading tools and educational content.</li>
                <li>Send you the newsletters you have subscribed to.</li>
                <li>Comply with legal obligations (e.g., tax laws).</li>
            </ul>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">3. Data Protection (GDPR)</h2>
            <p className="mb-4 text-brand-gray">We are a UK-based company. Under the GDPR, you have the right to access, correct, or delete your personal data. To exercise these rights, please contact us.</p>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">4. No Financial Advice</h2>
            <p className="mb-4 text-brand-gray">Our services are purely educational. We do not provide investment advice. We do not share your data with third parties for marketing purposes.</p>

            <h2 className="text-xl text-white font-bold mt-8 mb-4">5. Contact Us</h2>
            <p className="mb-4 text-brand-gray">For privacy concerns, please contact us at: support@mbridgetechnologies.uk</p>

            <div className="mt-12 pt-8 border-t border-white/10">
                <Link to="/" className="text-brand-teal hover:text-white transition-colors">&larr; Back to Home</Link>
            </div>
        </div>
    );
}
