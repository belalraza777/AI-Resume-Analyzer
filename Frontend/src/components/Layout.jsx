import { NavLink, useNavigate } from 'react-router-dom';
import { FiBarChart2, FiHome, FiLogOut, FiUploadCloud, FiUser } from 'react-icons/fi';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

// Primary navigation links shown when authenticated
const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/upload', label: 'Upload', icon: FiUploadCloud },
  { to: '/reports', label: 'Reports', icon: FiBarChart2 },
];

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="brand" aria-label="ResumeAI home">
          <div className="brand-mark">A</div>
          <div>
            <div>ResumeAI</div>
            <div className="muted">ATS-ready resumes</div>
          </div>
        </div>
        <nav className="nav-links" aria-label="Primary">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <link.icon size={16} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="nav-user">
          <span className="user-pill">
            <FiUser size={16} />
            {user?.username || user?.email || 'User'}
          </span>
          <Button variant="secondary" onClick={handleLogout} icon={FiLogOut}>
            Logout
          </Button>
        </div>
      </header>
      <main className="page">{children}</main>
    </div>
  );
};

export default Layout;
