import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const videoElementRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const target = document.querySelector('#about-visual-target');
      
      if (!target || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const setupAnimation = () => {
          // Reset styles to calculate raw coordinates
          gsap.set(containerRef.current, { clearProps: 'all' });
          gsap.set(videoElementRef.current, { clearProps: 'all' });

          const mainElement = document.querySelector('main');
          const mainRect = mainElement ? mainElement.getBoundingClientRect() : { top: 0, left: 0 };
          
          const getRelativeRect = (el) => {
            const rect = el.getBoundingClientRect();
            return {
              top: rect.top - mainRect.top,
              left: rect.left - mainRect.left,
              width: rect.width,
              height: rect.height,
            };
          };

          // The source is exactly the full viewport (Hero section background)
          const sourceRect = {
            top: -mainRect.top,
            left: -mainRect.left,
            width: window.innerWidth,
            height: window.innerHeight,
          };
          const targetRect = getRelativeRect(target);

          // Initial state: Fullscreen absolute container
          gsap.set(containerRef.current, {
            position: 'absolute',
            top: sourceRect.top,
            left: sourceRect.left,
            width: sourceRect.width,
            height: sourceRect.height,
            zIndex: 0,
            borderRadius: '0px',
            clipPath: 'inset(0% 0% 0% 0%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end', // Match original hero alignment
            backgroundColor: 'black', // Original background
          });

          // Original video styles inside the container
          gsap.set(videoElementRef.current, {
            height: '100vh',
            width: 'auto',
            maxWidth: 'none',
            objectFit: 'contain',
            transformOrigin: 'right center',
          });

          // Animation timeline tied to scroll
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: () => `+=${targetRect.top - sourceRect.top}`, 
              scrub: 1,
            }
          });

          // Animate the container down to the target box
          tl.to(containerRef.current, {
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
            borderRadius: '16px',
            backgroundColor: 'transparent',
            ease: 'power2.inOut',
          }, 0);

          // Animate the inner video to perfectly fit the target box (object-cover equivalent)
          tl.to(videoElementRef.current, {
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transformOrigin: 'center center',
            ease: 'power2.inOut',
          }, 0);

          // (Removed currentTime scrubbing so video plays continuously)
        };

        setupAnimation();

        window.addEventListener('resize', () => {
          ScrollTrigger.refresh();
          setupAnimation();
        });

      });
      return () => ctx.revert();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handle video starting at 1 second and looping back to 1 second
  const handleVideoLoaded = () => {
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = 1;
    }
  };

  const handleVideoEnded = () => {
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = 1;
      videoElementRef.current.play();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="pointer-events-none overflow-hidden"
      style={{ willChange: 'top, left, width, height, background-color, border-radius' }}
    >
      <video
        ref={videoElementRef}
        autoPlay
        muted
        playsInline
        onLoadedMetadata={handleVideoLoaded}
        onEnded={handleVideoEnded}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none" />
    </div>
  );
}
