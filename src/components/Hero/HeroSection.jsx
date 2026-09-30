import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css'; // Just keeping it for any specific custom CSS

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navItems = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'CONTACT', href: '#contact' },
];

export const HeroSection = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero-section" className="relative w-screen h-[100dvh] overflow-hidden bg-transparent text-[#EDEAE4] font-sans selection:bg-[var(--tide)] selection:text-black cursor-none">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--ink)]">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/images/hero-sunset.jpg" 
          alt="Sunset Coding Setup" 
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Vignettes and Gradients to blend into the rest of the site */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ink)]/40 to-[var(--ink)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/90 via-[var(--ink)]/30 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div> {/* Global dim for readability */}
      </div>

      {/* ================= 1. MINIMAL CUSTOM CURSOR ================= */}
      {cursorPos.x >= 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border flex items-center justify-center backdrop-blur-[1px]"
          style={{ borderColor: 'rgba(255,123,0,0.4)' }}
          animate={{
            x: cursorPos.x - (isHovered ? 24 : 5),
            y: cursorPos.y - (isHovered ? 24 : 5),
            width: isHovered ? 48 : 10,
            height: isHovered ? 48 : 10,
            backgroundColor: isHovered ? 'rgba(255,123,0,0.15)' : 'rgba(255, 255, 255, 0.95)',
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.5 }}
        />
      )}

      {/* ================= 2. CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 pt-6 pb-8 pointer-events-none">
        
        {/* Navigation Bar Header */}
        <header className="relative flex items-center justify-between w-full pointer-events-auto mt-4">
          <a
            href="#"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-white hover:opacity-75 transition-opacity"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            NIMISH.
          </a>

          <nav
            className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[11px] tracking-[0.28em] font-light uppercase text-gray-300 absolute left-1/2 -translate-x-1/2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group py-1 transition-colors duration-300 hover:text-white"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--tide)]/70 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex items-center space-x-2 text-[11px] tracking-[0.24em] font-light uppercase py-2 px-4 border border-[var(--tide)]/40 hover:border-[var(--tide)] text-white transition-all duration-300 backdrop-blur-sm ml-auto md:ml-0"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>LET&apos;S TALK</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs text-[var(--tide)]">
              ↗
            </span>
          </a>
        </header>

        {/* Main Hero Row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full flex-1 pt-12 md:pt-20">
          
          {/* LEFT: Name Hierarchy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-[65%] pointer-events-auto z-20 flex flex-col justify-center h-full pb-10"
          >
            {/* 1. Name Reveal */}
            <motion.div variants={fadeUpVariants} className="relative select-none z-10 mb-2">
              <h1
                className="text-[4rem] sm:text-[6rem] md:text-[7rem] lg:text-[9.5rem] xl:text-[10.5rem] tracking-tight uppercase leading-[0.8]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#FFF3EB] to-[#FFC499] drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                  NIMISH
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFC499] via-[#FF7B00] to-[#993D00] drop-shadow-[0_8px_25px_rgba(255,123,0,0.4)] -mt-2 lg:-mt-4">
                  AGRAWAL
                </span>
              </h1>
            </motion.div>

            {/* 2. Role */}
            <motion.div variants={fadeUpVariants} className="mb-6 mt-4">
              <p
                className="text-xs sm:text-sm md:text-[15px] font-medium tracking-[0.3em] uppercase text-gray-200"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                SOFTWARE ENGINEER <span className="text-[var(--tide)] mx-1.5 opacity-80">/</span> CREATIVE DEVELOPER
              </p>
            </motion.div>

            {/* 3. Creative Statement */}
            <motion.div
              variants={fadeUpVariants}
              className="mb-8 pl-1 md:pl-0 border-l-2 border-[var(--tide)]/40 md:border-none pl-4 md:pl-0"
            >
               <h2 className="text-xl sm:text-2xl md:text-[1.75rem] font-light text-gray-300 tracking-wide leading-snug" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                 <span className="text-white font-medium drop-shadow-md">Crafting digital worlds.</span> <br className="hidden md:block" /> Turning bold ideas into seamless, high-performance experiences.
               </h2>
            </motion.div>

            {/* 4. CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <motion.a
                href="#projects"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center justify-center w-full sm:w-auto space-x-3 px-8 py-4 border border-[var(--tide)]/60 bg-[var(--ink)]/70 hover:border-[var(--tide)] text-white text-[11px] font-bold tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(255,123,0,0.25)] backdrop-blur-md"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--tide)]/60 to-transparent pointer-events-none" />
                <span>EXPLORE MY WORK</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs text-[var(--tide)]">
                  ↗
                </span>
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto space-x-2 px-8 py-4 border border-white/20 hover:border-white/50 text-gray-300 hover:text-white text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 backdrop-blur-sm bg-black/20"
              >
                <span>DOWNLOAD RESUME</span>
                <span className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-xs">
                  ↓
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
