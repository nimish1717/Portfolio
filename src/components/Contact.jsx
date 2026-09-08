import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

function ArrowIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact-section section-container" id="contact">
      <h3 ref={headingRef}>Contact</h3>

      <div ref={contentRef} className="contact-flex">
        <div className="contact-box">
          <h4>Email</h4>
          <p>
            <a href="mailto:nimish.agrawal@example.com" data-cursor="disable">
              nimish.agrawal@example.com
            </a>
          </p>
          <h4>Education</h4>
          <p>B.E. in Computer Engineering</p>
        </div>

        <div className="contact-box">
          <h4>Social</h4>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
            className="contact-social"
          >
            Github <ArrowIcon />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
            className="contact-social"
          >
            Linkedin <ArrowIcon />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
            className="contact-social"
          >
            Instagram <ArrowIcon />
          </a>
        </div>

        <div className="contact-box">
          <h2>
            Designed and Developed <br /> by{' '}
            <span>Nimish Agrawal</span>
          </h2>
          <h5>
            © {new Date().getFullYear()}
          </h5>
        </div>
      </div>
    </section>
  );
}
