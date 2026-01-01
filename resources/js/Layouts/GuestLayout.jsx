import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0a0f0d] text-gray-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <img
                    src="/images/welcome/hero.png"
                    alt="Smart Agriculture background"
                    className="h-full w-full object-cover opacity-20 blur-[1px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/90 via-[#0a0f0d]/70 to-[#0a0f0d]"></div>
            </div>

            <div className="relative z-10 flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
                <div className="animate-fade-in-up">
                    <Link href="/">
                        <ApplicationLogo className="h-24 w-auto drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform hover:scale-105" />
                    </Link>
                </div>

                <div className="mt-8 w-full overflow-hidden bg-gray-900/40 px-8 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-emerald-500/10 backdrop-blur-xl sm:max-w-md sm:rounded-3xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {children}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}} />
        </div>
    );
}
