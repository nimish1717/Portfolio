import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useStore } from '../../store/useStore';

export const FraudDetection = () => {
    const containerRef = useRef(null);
    const setActiveWorld = useStore((state) => state.setActiveWorld);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveWorld('fraud'),
                onEnterBack: () => setActiveWorld('fraud'),
            });
            
            const sections = gsap.utils.toArray('.fraud-section');
            sections.forEach((section) => {
                gsap.fromTo(section, { opacity: 0, x: -50 }, {
                    opacity: 1,
                    x: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: true,
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setActiveWorld]);

    return (
        <section ref={containerRef} className="relative min-h-[400vh] w-full pt-[30vh] pb-[50vh] px-6 md:px-24 pointer-events-none z-10 flex flex-col justify-start gap-[60vh]">
            
            <div className="fraud-section w-full max-w-2xl pointer-events-auto">
                <h2 className="text-[8vw] md:text-[6vw] font-heading font-black tracking-tighter text-[#ccff00] leading-none mb-4">
                    AI FRAUD<br/>DETECTION
                </h2>
                <div className="font-mono text-sm tracking-widest text-white/50 border-l border-white/20 pl-4 uppercase">
                    LIVING TRANSACTION NETWORK
                </div>
            </div>

            <div className="fraud-section w-full max-w-sm pointer-events-auto">
                <div className="border border-[#ccff00]/30 bg-[#ccff00]/5 p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-heading font-black text-[#ccff00] mb-2">ANOMALY DETECTED</h3>
                    <p className="font-mono text-xs text-white/70 leading-relaxed uppercase mb-4">
                        Normal transactions flow in predictable patterns. Fraud introduces chaos. We built a system to spot the deviation in real-time.
                    </p>
                    <div className="text-[10px] font-mono text-[#ccff00]/50 tracking-widest">
                        DATASET: 2.4M TRANSACTIONS
                    </div>
                </div>
            </div>

            <div className="fraud-section w-full max-w-lg self-end pointer-events-auto">
                <h3 className="text-3xl font-heading font-black text-white/80 mb-8">MODEL COMPARISON</h3>
                <div className="flex flex-col gap-4 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/50">LOGISTIC REGRESSION</span>
                        <span className="text-[#ccff00]">82.4% ACCURACY</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/50">RANDOM FOREST</span>
                        <span className="text-[#ccff00]">94.1% ACCURACY</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#ccff00]/50 pb-2">
                        <span className="text-white">XGBOOST (PRODUCTION)</span>
                        <span className="text-[#ccff00] font-bold">98.7% ACCURACY</span>
                    </div>
                </div>
            </div>

            <div className="fraud-section w-full max-w-md pointer-events-auto">
                <h3 className="text-3xl font-heading font-black text-white/50 mb-4">THE RESULT</h3>
                <p className="font-mono text-xs text-white/80 leading-relaxed uppercase mb-8">
                    An optimized XGBoost model deployed via FastAPI, capable of classifying transaction intent in under 45ms.
                </p>
                <button className="px-6 py-3 bg-[#ccff00] text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    VIEW REPOSITORY
                </button>
            </div>

        </section>
    );
};
