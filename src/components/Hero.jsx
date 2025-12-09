import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
    return (
        <header className="relative pt-32 pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center justify-center">
            {/* BACKGROUND EFFECTS */}
            <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-teal rounded-full blur-[150px] opacity-10 pointer-events-none z-0 animate-pulse-slow"></div>
            <div className="fixed bottom-0 right-1/4 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-10 pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                {/* STATUS BADGE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-teal/30 bg-brand-teal/5 text-brand-teal font-mono text-xs mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                    </span>
                    MARKETS: OPEN
                </motion.div>

                {/* HEADLINE */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1]"
                >
                    Stop Gambling. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-white to-blue-400 text-glow">Start Engineering.</span>
                </motion.h1>

                {/* SUBHEADLINE */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-brand-gray text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    The market isn't a casino. It's a probability engine.
                    MBridge gives you the <span className="text-white font-medium border-b border-brand-teal/50">institutional-grade tools</span>,
                    risk calculators, and analysis for the <strong>Forex and Stock</strong> markets.
                </motion.p>

                {/* CTA BUTTONS */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a href="#pricing" className="w-full sm:w-auto bg-brand-teal text-brand-dark font-bold text-lg py-4 px-10 rounded-lg hover:bg-white hover:shadow-[0_0_25px_rgba(45,212,191,0.6)] transition-all duration-300">
                        Get the Toolkit
                    </a>
                    <a href="#ai-demo" className="w-full sm:w-auto glass-panel text-white font-medium text-lg py-4 px-10 rounded-lg hover:border-brand-teal/50 transition-all flex items-center justify-center gap-2">
                        <ChevronRight className="text-brand-teal" />
                        Try AI Validator ✨
                    </a>
                </motion.div>
            </div>
        </header>
    );
}
