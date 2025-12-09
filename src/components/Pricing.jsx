import { ArrowRight, Lock } from 'lucide-react';

export default function Pricing() {
    return (
        <section id="pricing" className="py-20 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                <div className="glass-panel rounded-3xl p-10 md:p-16 text-center border-t border-brand-teal/20 relative overflow-hidden">

                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-48 bg-brand-teal/10 blur-3xl rounded-full pointer-events-none"></div>

                    <span className="inline-block py-1 px-3 rounded-full bg-brand-teal/20 text-brand-teal font-bold text-xs tracking-wider mb-6">LIMITED LAUNCH OFFER</span>

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">The "Side-Hustle" Starter Kit</h2>
                    <p className="text-brand-gray text-lg mb-10 max-w-xl mx-auto">
                        Get full access to the Web Apps, The Educational Course, and the Newsletter for a single one-time price.
                    </p>

                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="text-gray-500 text-2xl line-through decoration-red-500 decoration-2">$197</div>
                        <div className="text-6xl font-bold text-white tracking-tight">$49</div>
                        <div className="text-brand-gray self-end mb-2 font-medium">/ lifetime</div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        {/* Checkout Link */}
                        <a href="https://mbridgetechnologies.lemonsqueezy.com/buy/cfc9a462-2d7a-47f4-bf25-586b7617bfa9" className="group w-full md:w-auto bg-brand-teal text-brand-dark font-bold text-xl py-5 px-16 rounded-xl hover:scale-105 transition-transform duration-200 shadow-[0_0_30px_rgba(45,212,191,0.4)] flex items-center justify-center gap-3">
                            <span>Join MBridge Today</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>

                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                            <Lock size={14} className="text-green-500" />
                            Secured by Lemon Squeezy • Instant Digital Delivery
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
