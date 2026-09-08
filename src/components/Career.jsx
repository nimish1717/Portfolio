import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Career.css';

gsap.registerPlugin(ScrollTrigger);

const careerData = [
  {
    role: 'Education',
    company: 'Thapar Institute of Engineering',
    period: '2023 - Present',
    description:
      'B.E. Computer Engineering. Building a strong foundation in data structures, algorithms, databases, and software engineering principles.',
  },
  {
    role: 'Full-Stack Developer',
    company: 'Personal Projects',
    period: '2024',
    description:
      'Built full-stack web applications including PhantomPost (anonymous social platform) and JobPortal with React, Node.js, Express, and MongoDB.',
  },
  {
    role: 'Code for Good',
    company: 'JPMorgan Chase',
    period: '2025',
    description:
      'Selected for the Code for Good Hackathon. Collaborated with teams to develop technology solutions for nonprofit organizations.',
  },
  {
    role: 'ML Summer School',
    company: 'Amazon',
    period: '2026',
    description:
      'Selected for the Amazon ML Summer School program. Gained hands-on experience with machine learning models and real-world AI applications.',
  },
];

export default function Career() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const headingRef = useRef(null);
  const boxRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline line grows on scroll
      gsap.fromTo(
        timelineRef.current,
        { maxHeight: '0%' },
        {
          maxHeight: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );

      // Career boxes stagger in
      boxRefs.current.forEach((box, i) => {
        if (!box) return;
        gsap.fromTo(
          box,
          { opacity: 0, y: 40, x: i % 2 === 0 ? -20 : 20 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: box,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="career-section section-container" id="career">
      <div className="career-container">
        <h2 ref={headingRef}>
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">
          <div className="career-timeline" ref={timelineRef}>
            <div className="career-dot" />
          </div>

          {careerData.map((item, i) => (
            <div
              key={i}
              className="career-info-box"
              ref={(el) => (boxRefs.current[i] = el)}
            >
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <h3>{item.period}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
