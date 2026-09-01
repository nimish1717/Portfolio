"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useCursor } from "@/components/v3/ui/CustomCursor";

const FORM_STEPS = [
  { id: 1, label: "WHO ARE YOU?", type: "text", placeholder: "[ NAME ]" },
  { id: 2, label: "WHERE CAN I REACH YOU?", type: "email", placeholder: "[ EMAIL ]" },
  { id: 3, label: "WHAT ARE WE BUILDING?", type: "text", placeholder: "[ PROJECT TYPE ]" },
  { id: 4, label: "TELL ME ABOUT IT.", type: "text", placeholder: "[ MESSAGE ]" },
  { id: 5, label: "SEND IT.", type: "submit", placeholder: "" }
];

export function Chapter09Contact() {
  const containerRef = useRef(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", type: "", message: "" });
  const [isReady, setIsReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const { setCursorVariant, setCursorText } = useCursor();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const talkOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const ideaOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const buildOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const buildScale = useTransform(scrollYProgress, [0.4, 0.8], [0.8, 1]);

  useEffect(() => {
    if (inputRef.current && step > 1 && step < 5) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && step < 5) {
      e.preventDefault();
      const currentField = step === 1 ? "name" : step === 2 ? "email" : step === 3 ? "type" : "message";
      if (formData[currentField].trim() !== "") {
        setStep(prev => prev + 1);
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("nimish.agrawal@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    setIsReady(true);
  };

  return (
    <section id="contact" ref={containerRef} className="relative w-full min-h-[150vh] bg-[#0D0D0F] text-[#F1EFEA] overflow-hidden flex flex-col justify-end pb-32">
      
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-accent/5 to-transparent" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col h-full">
        
        {/* CINEMATIC OPENING (Scroll Tied) */}
        <div className="h-[80vh] flex flex-col justify-center items-center text-center relative pointer-events-none">
           <motion.h2 
             style={{ opacity: talkOpacity }}
             className="absolute font-bebas text-4xl tracking-widest text-white/50"
           >
             LET&apos;S TALK.
           </motion.h2>
           
           <motion.h2 
             style={{ opacity: ideaOpacity }}
             className="absolute font-bebas text-6xl tracking-widest text-white/80"
           >
             HAVE AN IDEA?
           </motion.h2>

           <motion.h2 
             style={{ opacity: buildOpacity, scale: buildScale }}
             className="absolute font-bebas text-7xl md:text-[8rem] lg:text-[10rem] tracking-tighter leading-[0.85] text-white uppercase"
           >
             LET&apos;S BUILD <br/>
             <span className="text-accent">SOMETHING</span> <br/>
             WORTH REMEMBERING.
           </motion.h2>
        </div>

        {/* 5-STEP FORM OR SUCCESS STATE */}
        <div className="min-h-[50vh] flex flex-col justify-center my-32">
          {!isReady ? (
            <div className="flex flex-col gap-8 max-w-4xl w-full">
              
              {/* Progress Line */}
              <div className="flex items-center gap-4 w-full">
                <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                  STEP 0{step} / 05
                </span>
                <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-accent"
                    initial={{ width: "20%" }}
                    animate={{ width: `${(step / 5) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              {/* Form Input Area */}
              <div className="relative h-[200px]">
                <AnimatePresence mode="popLayout">
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col gap-4"
                  >
                    <label className="font-bebas text-3xl md:text-5xl text-white/50 tracking-wider">
                      {FORM_STEPS[step-1].label}
                    </label>
                    
                    {step < 5 ? (
                      <input
                        ref={inputRef}
                        type={FORM_STEPS[step-1].type}
                        placeholder={FORM_STEPS[step-1].placeholder}
                        className="bg-transparent border-b border-white/20 focus:border-accent outline-none font-bebas text-5xl md:text-8xl text-white py-4 w-full placeholder:text-white/10 transition-colors"
                        value={
                          step === 1 ? formData.name :
                          step === 2 ? formData.email :
                          step === 3 ? formData.type : formData.message
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if(step === 1) setFormData(p => ({...p, name: val}));
                          if(step === 2) setFormData(p => ({...p, email: val}));
                          if(step === 3) setFormData(p => ({...p, type: val}));
                          if(step === 4) setFormData(p => ({...p, message: val}));
                        }}
                        onKeyDown={handleKeyDown}
                        onMouseEnter={() => setCursorVariant("text")}
                        onMouseLeave={() => setCursorVariant("default")}
                      />
                    ) : (
                      <button 
                        className="self-start mt-4 font-bebas text-7xl md:text-9xl text-accent hover:text-white transition-colors"
                        onClick={handleSend}
                        onMouseEnter={() => {
                          setCursorVariant("text");
                          setCursorText("READY");
                        }}
                        onMouseLeave={() => {
                          setCursorVariant("default");
                          setCursorText("");
                        }}
                      >
                        YES. →
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {step < 5 && (
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                  PRESS ENTER TO CONTINUE
                </span>
              )}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-start gap-8"
            >
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                 <span className="font-mono text-[10px] tracking-widest text-accent uppercase">MESSAGE READY</span>
              </div>
              <h3 className="font-bebas text-7xl md:text-[8rem] text-white tracking-tighter leading-[0.8]">
                THANK YOU.
              </h3>
              <p className="font-mono text-sm text-white/50 max-w-md mt-4">
                This is a static portfolio demonstration. In a production environment, your message would be sent securely to my inbox.
              </p>
              <button 
                onClick={() => { setIsReady(false); setStep(1); setFormData({name:"",email:"",type:"",message:""}); }}
                className="mt-8 font-mono text-[10px] tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-bg transition-colors uppercase"
              >
                RESET CONVERSATION
              </button>
            </motion.div>
          )}
        </div>

        {/* DIRECT LINKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pt-16 border-t border-white/10">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">DIRECT CONTACT</span>
            <button 
              onClick={copyEmail}
              className="group flex items-center justify-between p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              onMouseEnter={() => { setCursorVariant("text"); setCursorText("COPY"); }}
              onMouseLeave={() => { setCursorVariant("default"); setCursorText(""); }}
            >
              <span className="font-bebas text-4xl md:text-5xl text-white group-hover:text-accent transition-colors">
                {copied ? "COPIED ✓" : "EMAIL"}
              </span>
              <span className="font-mono text-[10px] text-white/30 group-hover:text-white transition-colors">nimish.agrawal@example.com</span>
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">SOCIAL & RESUME</span>
            <div className="grid grid-cols-3 gap-4 h-full">
              <a 
                href="https://github.com/nimishagrawal" 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col items-center justify-center gap-2 p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              >
                <span className="font-bebas text-2xl text-white/80 group-hover:text-white">GH</span>
                <span className="font-mono text-[9px] text-white/30 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">GITHUB ↗</span>
              </a>
              <a 
                href="https://linkedin.com/in/nimishagrawal" 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col items-center justify-center gap-2 p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              >
                <span className="font-bebas text-2xl text-white/80 group-hover:text-white">IN</span>
                <span className="font-mono text-[9px] text-white/30 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">LINKEDIN ↗</span>
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col items-center justify-center gap-2 p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              >
                <span className="font-bebas text-2xl text-white/80 group-hover:text-white">CV</span>
                <span className="font-mono text-[9px] text-white/30 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">DOWNLOAD ↓</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
