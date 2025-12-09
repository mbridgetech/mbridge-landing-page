import { motion } from 'framer-motion';
import { Activity, BookOpen, Mail } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: <Activity size={28} />,
            title: 'The "Can I Trade?" App',
            description: 'A web-based checklist that acts as your guardian angel. It checks risk, news events (like NFP or Earnings), and volatility. If it says RED LIGHT, you don\'t trade.',
            color: 'text-brand-teal',
            bg: 'bg-brand-teal/10',
            border: 'border-brand-teal/20',
            footer: 'Included in Bundle',
            footerColor: 'text-brand-teal'
        },
        {
            icon: <BookOpen size={28} />,
            title: 'No-Fluff Education',
            description: 'We don\'t teach you 100 chart patterns. We teach you the 3 things that matter: Risk Management, Psychology, and Probability. Optimized for Forex and Stock markets.',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            footer: 'Video Course',
            footerColor: 'text-blue-400'
        },
        {
            icon: <Mail size={28} />,
            title: 'M/W/F Market Insights',
            description: 'A newsletter that respects your inbox. Monday (The Plan), Wednesday (The Check-in), Friday (The Review). No signals. Just deep context on Major Pairs and Indices.',
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
            footer: 'Lifetime Access',
            footerColor: 'text-purple-400'
        }
    ];

    return (
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-3xl font-bold">The Trader's Arsenal</h2>
                <p className="text-brand-gray mt-4 max-w-xl mx-auto">
                    We stripped away the noise. This is the exact toolkit you need to run your trading like a business, not a hobby.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="glass-panel p-8 rounded-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            {/* Abstract Shape */}
                            <div className={`w-24 h-24 rounded-full ${f.bg} filter blur-xl`}></div>
                        </div>

                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 border ${f.bg} ${f.border} ${f.color}`}>
                            {f.icon}
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
                        <p className="text-brand-gray text-sm leading-relaxed mb-6">
                            {f.description}
                        </p>
                        <span className={`text-xs font-mono border-b border-white/10 pb-1 ${f.footerColor}`}>
                            {f.footer}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
