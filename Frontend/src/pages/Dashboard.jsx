import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import { 
  FiUpload, 
  FiFileText, 
  FiTarget, 
  FiZap, 
  FiCheckCircle,
  FiTrendingUp,
  FiArrowRight
} from 'react-icons/fi';

export default function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiTarget size={32} />,
      title: 'ATS Score Analysis',
      description: 'Get instant feedback on how well your resume matches ATS requirements with detailed scoring',
      color: 'primary'
    },
    {
      icon: <FiCheckCircle size={32} />,
      title: 'Skills Matching',
      description: 'Identify which skills match job requirements and discover missing competencies',
      color: 'success'
    },
    {
      icon: <FiZap size={32} />,
      title: 'AI-Powered Suggestions',
      description: 'Receive intelligent recommendations to improve your resume and increase interview chances',
      color: 'warning'
    },
    {
      icon: <FiTrendingUp size={32} />,
      title: 'Track Progress',
      description: 'Monitor your resume improvements over time with comprehensive analytics',
      color: 'info'
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <FiZap size={16} />
            <span>AI-Powered Resume Analysis</span>
          </div>
          <h1 className="hero-title">
            Optimize Your Resume for <span className="gradient-text">ATS Success</span>
          </h1>
          <p className="hero-description">
            Beat Applicant Tracking Systems with AI-driven insights. Upload your resume, 
            get instant analysis, and receive personalized recommendations to land more interviews.
          </p>
          <div className="hero-actions">
            <button 
              type="button" 
              className="button primary large"
              onClick={() => navigate('/upload')}
            >
              <FiUpload size={20} />
              <span>Upload Resume</span>
            </button>
            <button 
              type="button" 
              className="button secondary large"
              onClick={() => navigate('/report')}
            >
              <FiFileText size={20} />
              <span>View Reports</span>
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card">
            <div className="visual-score">
              <FiTarget size={40} />
              <div className="score-display">95%</div>
              <div className="score-label">ATS Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-section">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to create an ATS-friendly resume</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className={`feature-icon ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-card">
          <h2>Ready to Get Started?</h2>
          <p>Upload your resume now and receive instant AI-powered analysis</p>
          <button 
            type="button" 
            className="button primary large"
            onClick={() => navigate('/upload')}
          >
            <span>Get Started Now</span>
            <FiArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
