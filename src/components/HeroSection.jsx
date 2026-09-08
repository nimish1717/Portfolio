import { useEffect, useRef, useState } from 'react';
import FadeIn from './ui/FadeIn';
import Magnet from './ui/Magnet';
import ContactButton from './ui/ContactButton';

export default function HeroSection() {
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    let prevX = window.innerWidth / 2; // Start center
    const SENSITIVITY = 0.8;

    const handleMouseMove = (e) => {
      const video = videoRef.current;
      if (!video || isNaN(video.duration)) return;

      const currentX = e.clientX;
      const delta = currentX - prevX;
      prevX = currentX;

      const timeDelta = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let newTarget = targetTimeRef.current + timeDelta;
      
      // Clamp between 0 and video duration
      newTarget = Math.max(0, Math.min(newTarget, video.duration));
      targetTimeRef.current = newTarget;

      // Queue seek if not already seeking
      if (!isSeekingRef.current) {
        seekToTarget();
      }
    };

    const seekToTarget = () => {
      const video = videoRef.current;
      if (!video) return;

      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    };

    const handleSeeked = () => {
      const video = videoRef.current;
      if (!video) return;

      // If the target moved while we were seeking, seek again
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.1) {
        seekToTarget();
      } else {
        isSeekingRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const video = videoRef.current;
    if (video) {
      video.addEventListener('seeked', handleSeeked);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (video) {
        video.removeEventListener('seeked', handleSeeked);
      }
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      
      {/* Video Background */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-lighten pointer-events-none"
        style={{ objectPosition: '70% center' }}
        muted
        playsInline
        preload="auto"
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        
        {/* Navbar */}
        <FadeIn delay={0} y={-20} className="w-full flex justify-between px-6 md:px-10 pt-6 md:pt-8 font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#price" className="hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </FadeIn>

        {/* Heading Container */}
        <div className="w-full overflow-hidden mt-6 sm:mt-4 md:-mt-5">
          <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i&apos;m jack
            </h1>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
          <FadeIn delay={0.35} y={20}>
            <p className="font-light uppercase tracking-wide leading-snug text-[#D7E2EA] text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
              a 3d creator driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>
          
          <FadeIn delay={0.5} y={20}>
            <ContactButton className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base" />
          </FadeIn>
        </div>
      </div>

      {/* Magnetic Portrait */}
      <FadeIn 
        delay={0.6} 
        y={30} 
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] pointer-events-auto"
      >
        <Magnet padding={150} strength={3}>
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" 
            alt="Jack Portrait" 
            className="w-full h-auto object-contain pointer-events-none"
          />
        </Magnet>
      </FadeIn>

    </section>
  );
}
