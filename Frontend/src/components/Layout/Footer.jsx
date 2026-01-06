import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand-mark small">A</div>
          <div>
            <div className="brand-name">ResumeAI</div>
            <div className="brand-tag">Smarter resume analysis</div>
          </div>
        </div>

        <div className="footer-links" aria-label="Footer links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/report">Reports</Link>
        </div>

        <div className="footer-meta">© {new Date().getFullYear()} ResumeAI</div>
      </div>
    </footer>
  );
}
