export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-6 px-6 md:px-12 bg-black text-white/50 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center font-mono text-[10px] md:text-xs uppercase tracking-widest gap-4">
                <div className="text-white/70 font-bold">
                    NIMISH
                </div>
                <div>
                    © {currentYear}
                </div>
                <div className="flex items-center gap-2">
                    DESIGNED + BUILT WITH CURIOSITY
                    <span className="w-1.5 h-1.5 bg-accent rounded-full inline-block"></span>
                </div>
            </div>
        </footer>
    );
};
