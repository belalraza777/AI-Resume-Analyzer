import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Cookies are already set by backend, just fetch user data
        const { data } = await api.get('/auth/me');
        setUser(data.data);
        navigate('/login', { replace: true });
      } catch {
        navigate('/login', { replace: true });
      }
    };
    fetchUser();
  }, [navigate, setUser]);

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <p>Completing login...</p>
    </div>
  );
};

export default OAuthSuccess;
