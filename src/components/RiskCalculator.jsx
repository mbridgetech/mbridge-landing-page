import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RiskCalculator() {
    const [balance, setBalance] = useState(5000);
    const [riskPercent, setRiskPercent] = useState(1.0);
    const [stopLoss, setStopLoss] = useState(20);
    const [lots, setLots] = useState(0);
    const [riskAmount, setRiskAmount] = useState(0);

    useEffect(() => {
        // Logic: Risk Amount = Balance * (Risk% / 100)
        const calcRiskAmount = balance * (riskPercent / 100);
        // Logic: Lots = Risk Amount / (StopLoss * 10) (Standard lot approx)
        let calcLots = calcRiskAmount / (stopLoss * 10);

        if (calcLots < 0.01) calcLots = 0.01;

        setRiskAmount(calcRiskAmount);
        setLots(calcLots);
    }, [balance, riskPercent, stopLoss]);

    const adjustRisk = (delta) => {
        const newVal = riskPercent + delta;
        if (newVal >= 0.5 && newVal <= 5.0) {
            setRiskPercent(parseFloat(newVal.toFixed(1)));
        }
    };

    return (
        <section id="method" className="py-24 px-6 relative z-10 border-y border-white/5 bg-brand-dark/50">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                {/* LEFT: COPY */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        The "Gap" is in <br />
                        <span className="text-brand-teal">Your Risk Management.</span>
                    </h2>
                    <p className="text-brand-gray mb-8 text-lg">
                        Whether you trade <strong>EURUSD</strong> or <strong>Tech Stocks</strong>, most new traders obsess over "entries" but fail because they don't know their "size."
                        You don't need luck. You need a dashboard that tells you <strong>NO</strong> when the risk is too high.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20 text-red-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">The Amateur Way</h4>
                                <p className="text-sm text-brand-gray">Guessing lot sizes, risking 10% per trade, and ignoring major economic news events (NFP, FOMC).</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0 border border-brand-teal/20 text-brand-teal">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">The MBridge Way</h4>
                                <p className="text-sm text-brand-gray">Calculated risk per trade. Volatility filtering. Institutional discipline automated for you.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT: INTERACTIVE MINI-APP DEMO */}
                <motion.div
                    className="relative group"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Decorative Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-teal to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                    {/* The App Interface */}
                    <div className="relative glass-panel rounded-xl p-1 overflow-hidden">
                        {/* Title Bar */}
                        <div className="bg-brand-dark/80 p-3 flex justify-between items-center border-b border-white/5 rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs font-mono text-gray-500">mbridge_risk_calc.exe</div>
                        </div>

                        {/* App Content */}
                        <div className="p-6 font-mono text-sm bg-[#0f1623]">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-brand-teal text-xs uppercase tracking-widest">{">>"} Input Parameters</div>
                                <div className="text-gray-500 text-[10px] uppercase">Mode: Forex (Standard)</div>
                            </div>

                            <div className="space-y-4">
                                {/* Input 0 */}
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <label className="text-gray-400">Asset Pair</label>
                                    <span className="text-white">EUR/USD</span>
                                </div>
                                {/* Input 1 */}
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <label className="text-gray-400">Account Balance ($)</label>
                                    <input
                                        type="number"
                                        value={balance}
                                        onChange={(e) => setBalance(parseFloat(e.target.value))}
                                        className="bg-transparent text-right text-white focus:outline-none w-32"
                                    />
                                </div>
                                {/* Input 2 */}
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <label className="text-gray-400">Risk Percentage (%)</label>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => adjustRisk(-0.5)} className="text-gray-500 hover:text-white">-</button>
                                        <input type="number" value={riskPercent} readOnly className="bg-transparent text-right text-white focus:outline-none w-12" />
                                        <button onClick={() => adjustRisk(0.5)} className="text-gray-500 hover:text-white">+</button>
                                    </div>
                                </div>
                                {/* Input 3 */}
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <label className="text-gray-400">Stop Loss (Pips)</label>
                                    <input
                                        type="number"
                                        value={stopLoss}
                                        onChange={(e) => setStopLoss(parseFloat(e.target.value))}
                                        className="bg-transparent text-right text-white focus:outline-none w-20"
                                    />
                                </div>
                            </div>

                            {/* Result Box */}
                            <div className="mt-6 bg-brand-teal/5 border border-brand-teal/20 rounded p-4 text-center">
                                <div className="text-xs text-brand-teal uppercase mb-1">Safe Lot Size</div>
                                <div className="text-3xl font-bold text-white tracking-wider">{lots.toFixed(2)}</div>
                                <div className="text-xs text-gray-500 mt-1">Risk Amount: ${riskAmount.toFixed(2)}</div>
                            </div>

                            <div className="mt-4 text-[10px] text-gray-600 flex justify-between">
                                <span>Volatility Check: <span className="text-green-500">PASS</span></span>
                                <span>News Event: <span className="text-green-500">NONE</span></span>
                            </div>
                        </div>
                    </div>
                    {/* Caption */}
                    <p className="text-center text-xs text-gray-500 mt-4 font-mono">
                        *Try it: Change the balance above. This is a preview of Tool #1.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
