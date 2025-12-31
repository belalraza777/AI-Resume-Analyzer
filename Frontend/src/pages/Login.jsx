import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
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
      <Card className="auth-card">
        <div className="brand" style={{ marginBottom: 12 }}>
          <div className="brand-mark">A</div>
          <div>
            <div>ResumeAI</div>
            <div className="muted">Sign in to continue</div>
          </div>
        </div>
        <h2 style={{ margin: '8px 0' }}>Welcome back</h2>
        <p className="muted">Access your dashboard and reports.</p>

        {error ? <div className="error-text" style={{ marginBottom: 8 }}>{error}</div> : null}

        <form onSubmit={handleSubmit} className="section">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            icon={FiMail}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            icon={FiLock}
            placeholder="••••••••"
          />
          <Button type="submit" fullWidth loading={loading} icon={FiArrowRight}>
            Sign in
          </Button>
          <Button type="button" variant="secondary" fullWidth icon={FcGoogle} onClick={handleGoogle}>
            Continue with Google
          </Button>
          <Button type="button" variant="secondary" fullWidth icon={FaFacebook} onClick={handleFacebook}>
            Continue with Facebook
          </Button>
        </form>

        <p className="muted" style={{ marginTop: 16 }}>
          Need an account? <Link to="/register">Create one</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
