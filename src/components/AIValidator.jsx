import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Send } from 'lucide-react';

export default function AIValidator() {
    const [unlocked, setUnlocked] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState(null);

    const handleUnlock = (e) => {
        e.preventDefault();
        // Simulate API call to register email
        setTimeout(() => {
            setUnlocked(true);
        }, 800);
    };

    const analyzeTrade = async () => {
        if (!input.trim()) return;
        setLoading(true);

        const apiKey = ""; // API key is injected by the environment

        // Simulated response if no API key
        if (!apiKey) {
            setTimeout(() => {
                setOutput({ html: '<strong class="text-white border-b border-white/20">REJECTED</strong><br/>System is in demo mode. Please configure API key for live analysis.' });
                setLoading(false);
            }, 1500);
            return;
        }

        // Real API implementation
        const systemPrompt = "You are MBridge AI, a strict institutional risk manager for Forex and Stocks. Analyze the user's input. If it is a trade rationale, check for emotional bias (FOMO, revenge, hope) and vague logic. If it is news, explain the impact on USD or S&P500. Output a verdict: 'APPROVED' or 'REJECTED' followed by a 1-2 sentence professional, stoic explanation. Keep it under 50 words. Be direct.";

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: input }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] }
                })
            });
            const data = await response.json();
            const aiText = data.candidates[0].content.parts[0].text;
            const formattedText = aiText.replace(/(APPROVED|REJECTED)/g, '<strong class="text-white border-b border-white/20">$1</strong>');
            setOutput({ html: formattedText });
        } catch (error) {
            setOutput({ html: '<span class="text-red-400">System Offline. Please try again later.</span>' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="ai-demo" className="py-24 px-6 relative z-10 border-b border-white/5">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs tracking-wider mb-4 border border-purple-500/30">SUBSCRIBER EXCLUSIVE</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Risk Manager</span>
                    </h2>
                    <p className="text-brand-gray max-w-2xl mx-auto">
                        Institutional traders have a risk manager looking over their shoulder. Now you do too.
                        Validate your trade ideas instantly against institutional logic.
                    </p>
                </div>

                {/* AI INTERFACE */}
                <div className="glass-panel rounded-xl p-1 md:p-2 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative min-h-[400px]">

                    {/* LOCKED OVERLAY */}
                    <AnimatePresence>
                        {!unlocked && (
                            <motion.div
                                exit={{ opacity: 0, pointerEvents: 'none' }}
                                className="absolute inset-0 z-20 bg-brand-dark/95 backdrop-blur-md rounded-lg flex flex-col items-center justify-center p-6 text-center"
                            >
                                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 border border-purple-500/30 text-purple-400">
                                    <Lock />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Unlock the AI Validator</h3>
                                <p className="text-gray-400 mb-6 max-w-sm">Join our newsletter to access this tool instantly. We share market insights 3x a week.</p>

                                <form onSubmit={handleUnlock} className="w-full max-w-sm flex flex-col gap-4">
                                    <input type="email" required placeholder="Enter your best email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />

                                    <div className="flex items-start gap-3 text-left">
                                        <input type="checkbox" id="gdpr-consent" required className="mt-1 w-4 h-4 rounded bg-white/10 border-white/20 text-purple-600 focus:ring-purple-500" />
                                        <label htmlFor="gdpr-consent" className="text-xs text-gray-500 leading-tight">
                                            I consent to MBridge Technologies sending me market analysis and product updates. I understand I can unsubscribe at any time.
                                        </label>
                                    </div>

                                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-purple-900/20">
                                        Unlock Free Demo
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* THE TOOL */}
                    <div className={`bg-brand-dark rounded-lg overflow-hidden flex flex-col md:flex-row h-full transition-all duration-700 ${!unlocked ? 'blur-sm' : ''}`}>
                        {/* INPUT SIDE */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/10">
                            <label className="text-xs font-mono text-purple-400 mb-2 uppercase tracking-wider">{">>"} Trader's Log / News Feed</label>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full flex-grow bg-white/5 rounded-lg border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none mb-4 font-mono text-sm min-h-[200px]"
                                placeholder="Examples:&#10;- I want to buy Gold because it dropped too much.&#10;- Fed just raised interest rates by 25 basis points."
                            ></textarea>

                            <button onClick={analyzeTrade} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group">
                                <span>Analyze with Gemini</span>
                                <Sparkles className="group-hover:scale-125 transition-transform" />
                            </button>
                        </div>

                        {/* OUTPUT SIDE */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 bg-[#0f111a] flex flex-col relative min-h-[300px]">
                            <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
                                <Send size={100} className="text-purple-500" />
                            </div>

                            <label className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider flex justify-between">
                                <span>{">>"} AI Verdict</span>
                                {loading && <span className="text-purple-400 animate-pulse">Processing...</span>}
                            </label>

                            <div className="flex-grow font-mono text-sm leading-relaxed text-gray-300 overflow-y-auto">
                                {loading ? (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="spinner"></div>
                                    </div>
                                ) : output ? (
                                    <div dangerouslySetInnerHTML={{ __html: output.html }} className="animate-pulse-slow"></div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-center text-gray-600 italic">
                                        "Waiting for input data...<br />System ready for analysis."
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600">
                                *AI Analysis based on market psychology principles. Not financial advice.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
