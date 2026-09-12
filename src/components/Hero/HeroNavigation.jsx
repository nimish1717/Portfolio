import Magnet from '../ui/Magnet';
import './HeroNavigation.css';

export default function HeroNavigation() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-nav" aria-label="Hero navigation">
      <div className="hero-nav-left">
        <span className="hero-nav-logo">NIMISH AGRAWAL</span>
      </div>
      
      <div className="hero-nav-center hidden-mobile">
        <a href="#projects" onClick={scrollTo('projects')} data-cursor="link">WORK</a>
        <a href="#about" onClick={scrollTo('about')} data-cursor="link">ABOUT</a>
        <a href="#experience" onClick={scrollTo('experience')} data-cursor="link">EXPERIENCE</a>
        <a href="#contact" onClick={scrollTo('contact')} data-cursor="link">CONTACT</a>
      </div>

      <div className="hero-nav-right">
        <Magnet strength={12}>
          <a href="#contact" onClick={scrollTo('contact')} className="hero-nav-cta" data-cursor="link">
            LET&apos;S CONNECT
          </a>
        </Magnet>
      </div>
    </div>
  );
}
