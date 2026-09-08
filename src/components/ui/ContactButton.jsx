export default function ContactButton({ className = "", text = "Contact Me" }) {
  return (
    <button 
      className={`rounded-full uppercase font-medium tracking-widest text-white transition-transform hover:scale-105 active:scale-95 ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px'
      }}
    >
      {text}
    </button>
  );
}
