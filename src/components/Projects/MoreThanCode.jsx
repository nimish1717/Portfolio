import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

export const MoreThanCode = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full bg-black text-[#EDEAE4] font-sans pt-32 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Dimming when playing */}
      <motion.div 
        className="absolute inset-0 bg-black z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 0.8 : 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl tracking-tight uppercase leading-[0.85] select-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              <span className="block text-[#EDEAE4]">MORE THAN</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#46B7FF] to-[#0D62A6]">CODE.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm font-light text-gray-400 max-w-xs mt-6 md:mt-0 leading-relaxed text-right"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Same mindset everywhere.<br/>On the field or in code.
          </motion.p>
        </div>

        {/* Video Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-full aspect-[21/9] bg-[#060608] border border-[#46B7FF]/20 rounded-xl overflow-hidden group cursor-pointer"
          onClick={handlePlay}
        >
          {/* Top Labels */}
          <div className="absolute top-6 left-6 z-20 flex items-center space-x-4 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#46B7FF]">
              01 / SHORT FILM
            </span>
          </div>
          <div className="absolute top-6 right-6 z-20 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400">
              FOOTBALL · CODE · CREATE
            </span>
          </div>

          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            className="w-full h-full object-cover transition-transform duration-1000"
            style={{ transform: isPlaying ? 'scale(1.02)' : 'scale(1)' }}
            loop
            playsInline
          />

          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />

          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="absolute inset-0 flex items-center justify-center z-20"
              >
                <div className="w-20 h-20 rounded-full border border-[#46B7FF]/50 bg-black/30 backdrop-blur-sm flex items-center justify-center text-[#46B7FF] hover:bg-[#46B7FF] hover:text-black transition-colors duration-300">
                  <Play fill="currentColor" className="ml-1" size={24} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0D0D11]">
            <div className="h-full bg-[#46B7FF] w-1/3 opacity-50" /> {/* Mock progress */}
          </div>
        </motion.div>

        {/* Transition Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 text-center"
        >
          <span className="text-2xl md:text-4xl font-bold tracking-[0.2em] uppercase text-gray-700" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            BUILD <span className="text-[#46B7FF]">·</span> LEARN <span className="text-[#46B7FF]">·</span> PLAY <span className="text-[#46B7FF]">·</span> REPEAT.
          </span>
        </motion.div>

      </div>
    </div>
  );
};
