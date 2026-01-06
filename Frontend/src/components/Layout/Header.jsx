import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUploadCloud, FiFileText, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/upload', label: 'Upload', icon: FiUploadCloud },
  { to: '/report', label: 'Reports', icon: FiFileText },
];

export default function Header() {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/dashboard" className="brand" aria-label="ResumeAI home">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">ResumeAI</div>
            <div className="brand-tag">ATS resume insights</div>
          </div>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  ['nav-link', isActive ? 'active' : ''].filter(Boolean).join(' ')
                }
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="nav-actions">
          {user ? (
            <div className="user-pill" title={user.email || user.username}>
              <span className="user-avatar">{(user.username || user.email || 'U').slice(0, 1).toUpperCase()}</span>
              <span className="user-name">{user.username || user.email}</span>
            </div>
          ) : null}

          <button type="button" className="button secondary" onClick={handleLogout}>
            <FiLogOut size={18} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
