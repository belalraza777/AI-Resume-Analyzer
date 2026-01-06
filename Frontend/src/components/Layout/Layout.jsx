// components/layout/Layout.jsx
import { useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './Layout.css';


const Layout = ({ children }) => {
    const location = useLocation();
    const authPaths = ['/login', '/register'];
    const isAuthPage = authPaths.includes(location.pathname);

    // Render a simplified layout for authentication pages
    if (isAuthPage) {
        return (
            <div className="auth-layout">
                {children}
            </div>
        );
    }


    return (
        <div className="app-layout">
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <div className="main-container">
                {children}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;