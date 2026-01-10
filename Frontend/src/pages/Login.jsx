import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    window.location.href = `${base}/oauth/google`;
  };
  const handleFacebook = () => {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    window.location.href = `${base}/oauth/facebook`;
  };

  return (
    <div className="auth-shell">
      <div className="card auth-card">
        <div className="brand" style={{ marginBottom: 12 }}>
          <div className="brand-mark">A</div>
          <div>
            <div>ResumeAI</div>
            <div className="muted">Sign in to continue</div>
          </div>
        </div>
        <h2 style={{ margin: '8px 0' }}>Welcome back</h2>
        <p className="muted">Access your account.</p>

        {error ? <div className="error-text" style={{ marginBottom: 8 }}>{error}</div> : null}

        <form onSubmit={handleSubmit} className="section">
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
                placeholder="••••••••"
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
            <span>Sign in</span>
          </button>

          <button
            type="button"
            className="button secondary full-width"
            onClick={handleGoogle}
          >
            <FcGoogle size={18} aria-hidden="true" />
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            className="button secondary full-width"
            onClick={handleFacebook}
          >
            <FaFacebook size={18} aria-hidden="true" />
            <span>Continue with Facebook</span>
          </button>
        </form>

        <p className="muted" style={{ marginTop: 16 }}>
          Need an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
