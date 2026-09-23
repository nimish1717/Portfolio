import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const paraRef = useRef(null);
  const para2Ref = useRef(null);
  const portraitRef = useRef(null);
  const supportImagesRef = useRef([]);
  const infoStripRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // 1. "02 / ABOUT" fades in.
      // 2. Eyebrow fades in.
      tl.fromTo(
        [headerRef.current, eyebrowRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
      );

      // 3. Main headline reveals upward line-by-line.
      tl.fromTo(
        headlineRef.current.children,
        { y: 50, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        "-=0.4"
      );

      // 4. Paragraph fades upward.
      tl.fromTo(
        [paraRef.current, para2Ref.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        "-=0.4"
      );

      // 5. Main portrait gently moves upward into position.
      tl.fromTo(
        portraitRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        "-=0.6"
      );

      // 6. Supporting photographs appear with a slight stagger.
      tl.fromTo(
        supportImagesRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
        "-=0.8"
      );

      // 7. Bottom information strip reveals upward.
      tl.fromTo(
        infoStripRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        "-=0.4"
      );

      // Parallax on portrait
      gsap.to(portraitRef.current.querySelector('.about-portrait-img'), {
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-editorial-section relative">
      <div className="about-editorial-bg"></div>

      <div className="about-editorial-container">
        
        {/* TOP HEADER */}
        <div className="about-top-header" ref={headerRef}>
          <div className="about-top-left">02 / ABOUT</div>
          <div className="about-top-right">
            NIMISH<br />AGRAWAL
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="about-main-grid">
          
          {/* LEFT CONTENT */}
          <div className="about-left-col">
            <div className="about-eyebrow" ref={eyebrowRef}>A BIT ABOUT ME</div>
            
            <h2 className="about-headline" ref={headlineRef}>
              <span className="block overflow-hidden"><span className="block">SAME GUY,</span></span>
              <span className="block overflow-hidden"><span className="block">DIFFERENT</span></span>
              <span className="block overflow-hidden"><span className="block about-headline-accent">IDEAS.</span></span>
            </h2>

            <div className="about-paragraphs">
              <p ref={paraRef}>
                I'm a full-stack developer who enjoys turning ideas into real, usable products. I care about clean code, good design, and the small details that make a big difference.
              </p>
              <p ref={para2Ref}>
                When I'm not coding, you'll probably find me on a football field, exploring new tech, or thinking about what to build next.
              </p>
            </div>

            {/* Handwritten annotation */}
            <div className="about-annotation-left">
              <span className="annotation-text">
                Currently<br/>building things<br/>I wish existed.
              </span>
              <svg className="annotation-arrow" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10 C 15 5, 25 15, 35 30 M 35 30 L 25 32 M 35 30 L 32 20" stroke="var(--tide)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* RIGHT CONTENT (PORTRAIT & IMAGES) */}
          <div className="about-right-col">
            <div className="about-portrait-wrap" ref={portraitRef}>
              <div id="about-visual-target" style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none' }}></div>
              <img src="/videos/about.png" alt="Nimish Agrawal" className="about-portrait-img" />
              
              {/* Circular/Oval Annotation */}
              <div className="about-annotation-oval">
                <svg width="240" height="120" viewBox="0 0 240 120">
                  <path id="ovalPath" d="M 20 60 A 100 50 0 1 1 220 60 A 100 50 0 1 1 20 60" fill="none" stroke="rgba(237,234,228,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                  <text>
                    <textPath href="#ovalPath" startOffset="0%" fill="rgba(237,234,228,0.4)" fontSize="11" letterSpacing="0.1em" className="oval-text">
                      FOOTBALL · IDEAS · PRODUCTS · A BETTER ME · 
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Supporting Images */}
            <div className="about-support-img about-support-1" ref={(el) => (supportImagesRef.current[0] = el)}>
              <img src="/images/stadium_lights.jpg" alt="Stadium Lights" />
            </div>
            
            <div className="about-support-img about-support-2" ref={(el) => (supportImagesRef.current[1] = el)}>
              <img src="/images/football_pitch.jpg" alt="Football Pitch" />
            </div>

            {/* Personal Info */}
            <div className="about-personal-info">
              <div className="info-dot"></div>
              <div>INDIA</div>
              <div className="info-school">
                THAPAR INSTITUTE<br/>
                COMPUTER ENGINEERING<br/>
                B.E. · 2023 — 2027
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM INFORMATION STRIP */}
        <div className="about-bottom-strip" ref={infoStripRef}>
          <div className="about-strip-divider"></div>
          
          <div className="about-strip-cols">
            <div className="about-strip-col">
              <div className="col-num">01</div>
              <div className="col-title">FULL-STACK</div>
              <div className="col-desc">React · Node · C++ · Python</div>
            </div>
            <div className="about-strip-col">
              <div className="col-num">02</div>
              <div className="col-title">ENGINEERING</div>
              <div className="col-desc">Systems · APIs · Databases</div>
            </div>
            <div className="about-strip-col">
              <div className="col-num">03</div>
              <div className="col-title">DESIGN</div>
              <div className="col-desc">UI · Interaction · Motion</div>
            </div>
            <div className="about-strip-col">
              <div className="col-num">04</div>
              <div className="col-title">BEYOND CODE</div>
              <div className="col-desc">Football · Music · Exploring</div>
            </div>
          </div>

          <div className="about-strip-micro">
            <div className="micro-left">// BUILD LEARN PLAY REPEAT</div>
            <div className="micro-right">● CURRENTLY BUILDING WHAT'S NEXT</div>
          </div>
        </div>

      </div>
    </section>
  );
}
