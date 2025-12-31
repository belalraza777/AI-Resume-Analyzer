import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiMail, FiUser } from 'react-icons/fi';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
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
      <Card className="auth-card">
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
          <Input
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            icon={FiUser}
            placeholder="Your name"
          />
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
            placeholder="Create a strong password"
          />
          <Button type="submit" fullWidth loading={loading} icon={FiArrowRight}>
            Create account
          </Button>
        </form>

        <p className="muted" style={{ marginTop: 16 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
