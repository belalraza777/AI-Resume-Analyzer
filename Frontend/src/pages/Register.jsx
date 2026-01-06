import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(username, email, password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="card auth-card">
        <div className="brand" style={{ marginBottom: 12 }}>
          <div className="brand-mark">A</div>
          <div>
            <div>ResumeAI</div>
            <div className="muted">Create an account</div>
          </div>
        </div>
        <h2 style={{ margin: '8px 0' }}>Join ResumeAI</h2>
        <p className="muted">Start analyzing resumes with ATS insights.</p>

        {error ? <div className="error-text" style={{ marginBottom: 8 }}>{error}</div> : null}

        <form onSubmit={handleSubmit} className="section">
          <div className="form-group">
            <div className="label-row">Username</div>
            <div className="input-shell">
              <FiUser size={18} className="input-icon" aria-hidden="true" />
              <input
                className="input"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="Your name"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">Email</div>
            <div className="input-shell">
              <FiMail size={18} className="input-icon" aria-hidden="true" />
              <input
                className="input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">Password</div>
            <div className="input-shell">
              <FiLock size={18} className="input-icon" aria-hidden="true" />
              <input
                className="input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="button full-width"
            disabled={loading}
          >
            {loading && <span className="spinner" aria-hidden="true" />}
            <FiArrowRight size={18} aria-hidden="true" />
            <span>Create account</span>
          </button>
        </form>

        <p className="muted" style={{ marginTop: 16 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
