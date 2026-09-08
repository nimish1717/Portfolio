import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);
  const screenRef = useRef(null);
  const hoverRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const hover = hoverRef.current;

    const handleMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      wrap.style.setProperty('--mouse-x', x + 'px');
      wrap.style.setProperty('--mouse-y', y + 'px');
    };

    wrap.addEventListener('mousemove', handleMove);
    return () => wrap.removeEventListener('mousemove', handleMove);
  }, []);

  const handleClick = () => {
    setClicked(true);

    const tl = gsap.timeline();
    tl.to(wrapRef.current, {
      minWidth: 'calc(100vw + 5000px)',
      minHeight: 'calc(100vh + 500px)',
      borderRadius: '5000px',
      duration: 0.8,
      ease: 'power3.inOut',
    });
    tl.to(screenRef.current, {
      backgroundColor: '#0a0a0a',
      duration: 0.3,
    }, '-=0.3');
    tl.to(screenRef.current, {
      opacity: 0,
      duration: 0.4,
      delay: 0.1,
      onComplete: () => {
        onComplete();
      },
    });
  };

  return (
    <div
      ref={screenRef}
      className="loading-screen"
      style={{ cursor: 'pointer' }}
    >
      <div
        ref={wrapRef}
        className={`loading-wrap ${clicked ? 'loading-clicked' : ''}`}
      >
        <div ref={hoverRef} className="loading-hover" />
        <div className="loading-content">
          <div className="loading-content-in">
            <button
              ref={buttonRef}
              className="loading-button"
              onClick={handleClick}
            >
              <span>Open</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
