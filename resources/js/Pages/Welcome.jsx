import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="AgriSense - Smart IoT Agriculture" />
            <div className="min-h-screen bg-[#0a0f0d] text-gray-100 font-sans selection:bg-emerald-500 selection:text-white">
                {/* Hero Background */}
                <div className="fixed inset-0 z-0">
                    <img
                        src="/images/welcome/hero.png"
                        alt="Smart Agriculture background"
                        className="h-full w-full object-cover opacity-30 blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/80 via-transparent to-[#0a0f0d]"></div>
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    {/* Header */}
                    <header className="container mx-auto px-6 py-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/images/welcome/logo.png" alt="AgriSense Logo" className="h-12 w-auto" />
                            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                                AgriSense
                            </span>
                        </div>
                        <nav className="flex items-center gap-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-300 font-medium hover:text-emerald-400 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2 rounded-full bg-emerald-500 text-white font-semibold transition-all hover:bg-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Hero Section */}
                    <main className="flex-grow container mx-auto px-6 flex flex-col justify-center items-center text-center py-20">
                        <div className="max-w-4xl animate-fade-in-up">
                            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold uppercase tracking-wider">
                                IoT Powered Precision Farming
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                                Revolutionizing Agriculture with{' '}
                                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                    Smart Insights
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                                Empower your farm with real-time data, automated harvesting, and AI-driven analytics. Optimize resources and maximize yield like never before.
                            </p>
                            {!auth.user ? (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                                    <Link
                                        href={route('register')}
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 text-white text-lg font-bold transition-all hover:bg-emerald-600 hover:scale-105"
                                    >
                                        Join the Future
                                    </Link>
                                    <a
                                        href="#features"
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-700 bg-gray-800/50 text-gray-300 text-lg font-bold backdrop-blur-sm transition-all hover:bg-gray-800"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            ) : (
                                <div className="mb-12"></div>
                            )}

                            {/* Marketing Card */}
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gray-900/50 border border-emerald-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-sm text-gray-400 font-medium">Platform by</span>
                                    </div>
                                    <a 
                                        href="https://vertexcoreai.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-lg font-bold tracking-tight text-white transition-all hover:text-emerald-400 hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] flex items-center gap-1 group"
                                    >
                                        vertexcoreai.com
                                        <svg className="size-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Feature Cards */}
                        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full text-left">
                            <div className="p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50 backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-emerald-500/30 group">
                                <div className="size-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="size-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Real-time Monitoring</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Monitor soil moisture, temperature, and nutrient levels in real-time. Receive instant alerts on your dashboard.
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50 backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-blue-500/30 group">
                                <div className="h-48 overflow-hidden rounded-xl mb-6 relative">
                                    <img src="/images/welcome/harvest.png" alt="Smart Harvesting" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Automated Harvesting</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Next-gen robotic solutions that detect ripeness and harvest with precision, reducing labor costs and waste.
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-gray-800/20 border border-gray-700/50 backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-emerald-500/30 group">
                                <div className="size-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="size-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Yield Optimization</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Advanced data analytics predicts yield patterns and suggests optimizations for better crop quality and quantity.
                                </p>
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="py-12 border-t border-gray-800 bg-[#0a0f0d]">
                        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <img src="/images/welcome/logo.png" alt="AgriSense Logo" className="h-8 w-auto grayscale opacity-50" />
                                <span className="text-gray-500 font-semibold">© 2026 VertexCore AI. All rights reserved.</span>
                            </div>
                            <div className="text-gray-600 text-sm">
                                Powered by Laravel v{laravelVersion} (PHP v{phpVersion})
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
            `}} />
        </>
    );
}
