import { useState, useEffect } from 'react';
import { Menu, X, Hexagon, Component, TrendingUp, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* LOGO */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 relative">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
                            <path d="M50 5 L93.3 30 V80 L50 105 L6.7 80 V30 L50 5Z" stroke="#2DD4BF" strokeWidth="4" fill="rgba(11,17,33,0.8)" />
                            <path d="M25 40 V80 M75 40 V80 M25 40 L50 65 L75 40" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="25" y="80" width="10" height="10" fill="#2DD4BF" opacity="0.8" />
                            <rect x="40" y="80" width="10" height="15" fill="#2DD4BF" opacity="0.6" />
                            <rect x="55" y="80" width="10" height="8" fill="#2DD4BF" opacity="0.9" />
                            <rect x="70" y="80" width="10" height="12" fill="#2DD4BF" opacity="0.7" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl tracking-tight text-white group-hover:text-brand-teal transition-colors">MBridge</span>
                        <span className="text-[0.6rem] uppercase tracking-widest text-brand-gray font-mono">Technologies</span>
                    </div>
                </Link>

                {/* DESKTOP LINKS */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <a href="/#method" className="hover:text-white transition-colors">The Tools</a>
                    <a href="/#ai-demo" className="hover:text-white transition-colors text-brand-teal flex items-center gap-1"><Cpu size={16} /> AI Validator ✨</a>
                    <a href="/#newsletter" className="hover:text-white transition-colors">Market Analysis</a>
                </div>

                {/* CTA BUTTON */}
                <div className="flex items-center gap-4">
                    <a href="/#pricing" className="hidden md:flex items-center gap-2 bg-brand-teal text-brand-dark font-bold py-2 px-5 rounded hover:bg-white hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">
                        <span>Get Access</span>
                        <TrendingUp size={16} />
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5">
                    <a href="/#method" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-white">The Tools</a>
                    <a href="/#ai-demo" onClick={() => setMobileMenuOpen(false)} className="text-lg text-brand-teal">AI Validator ✨</a>
                    <a href="/#newsletter" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-white">Market Analysis</a>
                    <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="bg-brand-teal text-brand-dark font-bold py-3 text-center rounded">Get Access</a>
                </div>
            )}
        </nav>
    );
}
