import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    year: '2023',
    num: '01',
    title: 'THE START',
    desc: 'Computer Engineering\nThapar Institute of Engineering & Technology',
    meta: 'New place\nNew people\nBigger dreams.',
    image: '/images/journey_2023.jpg'
  },
  {
    year: '2024',
    num: '02',
    title: 'BUILDING',
    desc: 'Full-Stack Development\n - React\n - Node.js\n - MongoDB\n - JavaScript',
    meta: 'Ideas\nProjects\nProducts.',
    image: '/images/journey_2024.jpg'
  },
  {
    year: '2025',
    num: '03',
    title: 'SHIPPING',
    desc: 'Projects\nHackathons\nReal Products\n\nJPMorgan Code for Good\nMultiple full-stack products\nMachine learning projects',
    meta: 'Build\nCollaborate\nLearn\nRepeat',
    image: '/images/journey_2025.jpg'
  },
  {
    year: '2026',
    num: '04',
    title: 'GOING DEEPER',
    desc: 'Amazon ML Summer School\n\nMachine Learning\nAI Systems\nEngineering',
    meta: 'Deeper\nStronger\nMore to explore.',
    image: '/images/journey_2026.jpg'
  },
  {
    year: 'NOW',
    num: '05',
    title: "WHAT'S NEXT?",
    desc: 'Build.\nLearn.\nShip.\nRepeat.',
    meta: 'Same guy.\nBigger plans.',
    image: '/images/journey_now.jpg'
  }
];

export default function Experience() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);
  const chapterRefs = useRef([]);
  const [activeChapter, setActiveChapter] = useState(-1);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Calculate total scroll distance based on track width vs viewport width
      const trackWidth = trackRef.current.scrollWidth;
      const scrollDist = trackWidth - window.innerWidth;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollDist}`,
          invalidateOnRefresh: true,
        }
      });

      tl.to(trackRef.current, {
        x: () => -scrollDist,
        ease: 'none'
      });

      if (progressLineRef.current) {
        gsap.to(progressLineRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollDist}`,
            scrub: true,
          }
        });
      }

      // Intersection Observer for Active Chapter in the fixed viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.getAttribute('data-index'));
              setActiveChapter(idx);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px -30% 0px -30%', // triggers when chapter is in the middle 40% of the screen
          threshold: 0.1
        }
      );

      chapterRefs.current.forEach((el) => {
        if (el) observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    });

    // For mobile vertical layout
    mm.add("(max-width: 767px)", () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.getAttribute('data-index'));
              setActiveChapter(idx);
            }
          });
        },
        { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0.1 }
      );

      chapterRefs.current.forEach((el) => {
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="journey-section">
      <div className="journey-track" ref={trackRef}>
        
        {/* Intro */}
        <div className="journey-intro flex-shrink-0 w-screen h-[100svh] md:h-full flex flex-col justify-center px-[5vw] lg:px-24 relative">
          <div className="journey-label mb-8">05 / JOURNEY</div>
          <h2 className="journey-huge-title leading-[0.85]">
            <span className="text-[var(--bone)] block">FROM ZERO</span>
            <span className="text-[var(--tide)] flex items-center gap-[2vw]">
              <svg className="w-[8vw] h-[8vw] max-w-[80px] max-h-[80px] min-w-[40px] min-h-[40px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              NOW.
            </span>
          </h2>
          
          <div className="absolute top-[20%] right-[10%] hidden lg:block opacity-70">
            <div className="font-['Caveat'] text-2xl text-[var(--mist)] uppercase tracking-widest leading-loose">
              Same curiosity.<br/>
              More discipline.<br/>
              Bigger ideas.
            </div>
          </div>
        </div>

        {/* Chapters */}
        {CHAPTERS.map((c, i) => (
          <div 
            key={c.year}
            ref={(el) => (chapterRefs.current[i] = el)}
            data-index={i}
            className={`journey-chapter flex-shrink-0 w-screen md:w-[75vw] lg:w-[65vw] h-[100svh] md:h-full flex items-center relative transition-all duration-700 ${activeChapter === i ? 'active' : ''}`}
          >
            {/* Giant background year */}
            <div className="chapter-bg-year absolute top-1/2 left-1/2 text-[35vw] md:text-[22vw] font-bold select-none z-0">
              {c.year}
            </div>

            <div className="chapter-content relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full px-[5vw] md:px-8">
              
              <div className="chapter-text flex flex-col justify-center">
                <div className="chapter-num text-[var(--tide)] font-mono text-sm mb-4">{c.num}</div>
                <div className="chapter-year text-5xl md:text-7xl font-bold text-[var(--bone)] mb-2">{c.year}</div>
                <div className="chapter-title text-2xl md:text-4xl font-bold tracking-wide text-white uppercase mb-8">{c.title}</div>
                
                <p className="chapter-desc text-[var(--bone)] text-base md:text-lg leading-relaxed whitespace-pre-line mb-8 border-l-2 border-[var(--tide)] pl-6">
                  {c.desc}
                </p>

                <div className="chapter-meta font-['Caveat'] text-2xl text-[var(--mist)] whitespace-pre-line rotate-[-3deg] opacity-90 mt-2">
                  {c.meta}
                </div>
              </div>

              <div className="chapter-visual relative h-[35vh] md:h-[55vh] overflow-hidden rounded-md group my-auto">
                <div className="chapter-visual-overlay absolute inset-0 bg-black/60 transition-colors duration-700 z-10 group-[.active]:bg-black/0"></div>
                <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out scale-110 group-[.active]:scale-100 filter grayscale-[70%] group-[.active]:grayscale-0" />
              </div>

            </div>
          </div>
        ))}

        {/* Outro */}
        <div className="journey-outro flex-shrink-0 w-screen md:w-[70vw] h-[100svh] md:h-full flex flex-col justify-center px-[5vw] lg:px-24">
          <h3 className="text-4xl md:text-6xl lg:text-[5rem] font-bold text-[var(--mist)] uppercase leading-[1.1] tracking-tight">
            AND THE STORY <br/> IS STILL BEING <br/>
            <span className="text-[var(--bone)]">WRITTEN.</span>
          </h3>
        </div>

      </div>

      {/* Progress Bar (Desktop only) */}
      <div className="journey-progress-bar hidden md:flex absolute bottom-10 left-[10vw] right-[10vw] z-50 items-center">
        {/* Background line */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1px] bg-[var(--line-strong)] z-0"></div>
        
        {/* Active line */}
        <div ref={progressLineRef} className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] bg-[var(--tide)] z-10 origin-left scale-x-0"></div>

        {/* Points */}
        <div className="relative z-20 w-full flex justify-between">
          {CHAPTERS.map((c, i) => {
            const isPassed = activeChapter >= i;
            const isCurrent = activeChapter === i;
            return (
              <div key={c.year} className="flex flex-col items-center justify-center relative">
                <div 
                  className={`w-[12px] h-[12px] rounded-full transition-all duration-500 z-10 ${
                    isCurrent 
                      ? 'bg-[var(--tide)] shadow-[0_0_15px_rgba(70,183,255,0.7)] scale-125 border-none' 
                      : isPassed
                        ? 'bg-[var(--tide)] border-none'
                        : 'bg-[var(--ink)] border border-[var(--dim)]'
                  }`}
                ></div>
                <span className={`absolute top-6 text-[10px] font-mono transition-colors duration-500 text-center uppercase tracking-widest ${
                  isCurrent ? 'text-[var(--bone)]' : 'text-[var(--dim)]'
                }`}>
                  {c.year}<br/>
                  <span className="opacity-50">{c.title}</span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Label */}
        <div className="absolute -top-12 right-0 text-[10px] font-mono tracking-widest text-[var(--dim)] uppercase flex items-center gap-2">
          Scroll to continue <span className="text-[var(--tide)]">→</span>
        </div>
      </div>

    </section>
  );
}
