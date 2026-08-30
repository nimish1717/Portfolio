"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";

const FORM_STEPS = [
  { id: 1, label: "YOUR NAME", type: "text", placeholder: "[ type here ]" },
  { id: 2, label: "YOUR EMAIL", type: "email", placeholder: "[ type here ]" },
  { id: 3, label: "WHAT ARE YOU BUILDING?", type: "text", placeholder: "[ type here ]" },
  { id: 4, label: "TELL ME MORE", type: "text", placeholder: "[ type here ]" },
  { id: 5, label: "SEND", type: "submit", placeholder: "" }
];

export function Chapter09Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", building: "", more: "" });
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const { setCursorVariant, setCursorText } = useCursor();

  // Avatar states based on step
  const getAvatarState = () => {
    switch(step) {
      case 1: return { scale: 1, rotateY: 0, filter: "brightness(0.5) contrast(1.2)" };
      case 2: return { scale: 1.05, rotateY: 15, filter: "brightness(0.7) contrast(1.3)" };
      case 3: return { scale: 1.1, rotateY: -10, filter: "brightness(1) contrast(1.5) sepia(0.5)" };
      case 4: return { scale: 1.15, rotateY: 20, filter: "brightness(1.2) contrast(1.6) sepia(0.8)" };
      case 5: return { scale: 1.2, rotateY: 0, filter: "brightness(1.5) contrast(2) hue-rotate(90deg)" };
      default: return { scale: 1, rotateY: 0, filter: "brightness(0.5) contrast(1.2)" };
    }
  };

  const avatarState = getAvatarState();

  useEffect(() => {
    if (inputRef.current && step < 5) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && step < 5) {
      e.preventDefault();
      // Basic validation
      const currentField = FORM_STEPS[step-1].label.toLowerCase().includes("name") ? "name" :
                           FORM_STEPS[step-1].label.toLowerCase().includes("email") ? "email" :
                           FORM_STEPS[step-1].label.toLowerCase().includes("building") ? "building" : "more";
      
      if (formData[currentField].trim() !== "") {
        setStep(prev => prev + 1);
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("nimish.agrawal@example.com"); // Replace with actual email later if provided
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-bg text-fg overflow-hidden flex flex-col justify-between py-24">
      
      {/* Background Avatar */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none mix-blend-screen">
        <motion.div
           animate={{ 
             scale: avatarState.scale, 
             rotateY: avatarState.rotateY,
             rotateZ: step === 5 ? 10 : 0
           }}
           transition={{ duration: 1, ease: "easeInOut" }}
           className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full overflow-hidden mask-image-radial"
           style={{ perspective: 1000 }}
        >
          <motion.img 
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Contact Avatar"
            className="w-full h-full object-cover"
            animate={{ filter: avatarState.filter }}
            transition={{ duration: 1 }}
          />
          {step >= 3 && (
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay animate-pulse" />
          )}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex-1 flex flex-col justify-between h-full">
        
        {/* Layer 1: Huge CTA */}
        <div className="flex flex-col gap-4 mt-12">
          <h2 className="font-bebas text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.85] text-white">
            HAVE AN IDEA?<br/>
            LET&apos;S MAKE<br/>
            SOMETHING<br/>
            <span className="text-accent">INTERESTING.</span>
          </h2>
        </div>

        {/* Layer 2: Interactive Form */}
        <div className="flex flex-col justify-center my-24 min-h-[30vh]">
          <div className="flex flex-col gap-8 max-w-4xl">
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              STEP 0{step} / 05
            </span>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={step}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4"
              >
                <label className="font-bebas text-4xl md:text-6xl text-white/50 tracking-wider">
                  {FORM_STEPS[step-1].label}
                </label>
                
                {step < 5 ? (
                  <input
                    ref={inputRef}
                    type={FORM_STEPS[step-1].type}
                    placeholder={FORM_STEPS[step-1].placeholder}
                    className="bg-transparent border-b-2 border-white/20 focus:border-accent outline-none font-bebas text-5xl md:text-8xl text-white py-4 w-full placeholder:text-white/10 transition-colors"
                    value={
                      step === 1 ? formData.name :
                      step === 2 ? formData.email :
                      step === 3 ? formData.building : formData.more
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if(step === 1) setFormData(p => ({...p, name: val}));
                      if(step === 2) setFormData(p => ({...p, email: val}));
                      if(step === 3) setFormData(p => ({...p, building: val}));
                      if(step === 4) setFormData(p => ({...p, more: val}));
                    }}
                    onKeyDown={handleKeyDown}
                    onMouseEnter={() => setCursorVariant("text")}
                    onMouseLeave={() => setCursorVariant("default")}
                  />
                ) : (
                  <button 
                    className="self-start mt-4 font-bebas text-6xl md:text-8xl text-accent hover:text-white transition-colors"
                    onClick={() => {
                      setStep(1);
                      setFormData({ name: "", email: "", building: "", more: "" });
                      alert("Message sequence complete! (Simulation)");
                    }}
                    onMouseEnter={() => {
                      setCursorVariant("text");
                      setCursorText("SEND");
                    }}
                    onMouseLeave={() => {
                      setCursorVariant("default");
                      setCursorText("");
                    }}
                  >
                    SEND INTERMISSION →
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
            
            {step < 5 && (
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-4">
                PRESS ENTER TO CONTINUE
              </span>
            )}
          </div>
        </div>

        {/* Layer 3: Alternatives */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-white/10">
          <div className="flex flex-col gap-6 group">
            <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">OR REACH ME DIRECTLY</span>
            <button 
              onClick={copyEmail}
              className="font-bebas text-3xl md:text-5xl text-left hover:text-accent transition-colors flex items-center gap-4"
              onMouseEnter={() => { setCursorVariant("text"); setCursorText("COPY"); }}
              onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
            >
              {copied ? "COPIED ✓" : "EMAIL →"}
            </button>
          </div>
          
          <div className="flex flex-col gap-6 group justify-end">
            <a 
              href="https://github.com/nimishagrawal" 
              target="_blank" 
              rel="noreferrer"
              className="font-bebas text-3xl md:text-5xl hover:text-accent transition-colors flex items-center gap-4 group-hover:translate-x-2 duration-300"
            >
              GITHUB <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </div>

          <div className="flex flex-col gap-6 group justify-end">
            <a 
              href="https://linkedin.com/in/nimishagrawal" 
              target="_blank" 
              rel="noreferrer"
              className="font-bebas text-3xl md:text-5xl hover:text-accent transition-colors flex items-center gap-4 group-hover:translate-x-2 duration-300"
            >
              LINKEDIN <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </div>

          <div className="flex flex-col gap-6 group justify-end items-start md:items-end">
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="font-bebas text-3xl md:text-5xl text-accent hover:text-white transition-colors flex items-center gap-4 border-b border-accent pb-1 group-hover:-translate-y-1 duration-300"
            >
              RESUME ↗
            </a>
            <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">DOWNLOAD PDF</span>
          </div>
        </div>

      </div>
    </section>
  );
}
