import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-black/20 text-center">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-center gap-2 mb-6 opacity-50 hover:opacity-100 transition-opacity">
                    {/* Tiny Logo */}
                    <svg viewBox="0 0 100 100" fill="none" className="w-6 h-6">
                        <path d="M50 5 L93.3 30 V80 L50 105 L6.7 80 V30 L50 5Z" stroke="#2DD4BF" strokeWidth="5" fill="none" />
                        <path d="M25 40 V80 M75 40 V80 M25 40 L50 65 L75 40" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-bold text-white">MBridge Technologies</span>
                </div>

                <p className="text-gray-600 text-sm mb-2">
                    &copy; {new Date().getFullYear()} MBridge Technologies. All rights reserved.
                </p>
                <p className="text-xs text-gray-700 mb-6">
                    Registered in England & Wales. Company No: 16708904 | Registered Address: 71-75 SHELTON STREET, COVENT GARDEN, LONDON, UNITED KINGDOM WC2H 9JQ
                </p>

                <div className="max-w-3xl mx-auto border-t border-white/5 pt-6">
                    <p className="text-[10px] text-gray-500 leading-relaxed text-justify">
                        <strong>High Risk Warning:</strong> Spread betting and CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. You should consider whether you understand how these instruments work and whether you can afford to take the high risk of losing your money. <br /><br />

                        <strong>Disclaimer:</strong> MBridge Technologies provides educational software and analysis tools only. We are not a financial advisor, broker, or investment fund. The information provided is not intended to be and does not constitute financial advice, investment advice, trading advice, or any other advice. <br /><br />

                        <strong>Cryptocurrency Notice:</strong> We do not offer services, education, or tools related to cryptocurrency trading.
                    </p>
                    <div className="flex justify-center gap-4 mt-4 text-[10px] text-gray-600">
                        <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
