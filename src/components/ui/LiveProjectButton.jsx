export default function LiveProjectButton({ className = "" }) {
  return (
    <button 
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors hover:bg-[#D7E2EA]/10 ${className}`}
    >
      Live Project
    </button>
  );
}
