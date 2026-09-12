import './Footer.css';

const EMAIL    = 'nimish.agrawal@thapar.edu';
const GITHUB   = 'https://github.com/nimish1717';
const LINKEDIN = 'https://linkedin.com/in/nimish-agrawal';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        {/* Left: identity */}
        <div className="footer-id">
          <p className="footer-name">NIMISH AGRAWAL</p>
          <p className="t-label footer-role">Software Engineer · Creative Developer</p>
        </div>

        {/* Centre: links */}
        <div className="footer-links">
          <a href={GITHUB}   target="_blank" rel="noopener noreferrer" className="footer-link" data-cursor="link">GitHub</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="footer-link" data-cursor="link">LinkedIn</a>
          <a href={`mailto:${EMAIL}`} className="footer-link" data-cursor="link">Email</a>
        </div>

        {/* Right: scroll top + year */}
        <div className="footer-right">
          <button
            className="footer-scroll-top"
            onClick={scrollTop}
            aria-label="Scroll to top"
            data-cursor="link"
          >
            ↑ Top
          </button>
          <p className="t-label footer-copy">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
