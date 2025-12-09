import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-brand-dark text-white font-sans selection:bg-brand-teal selection:text-brand-dark">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
