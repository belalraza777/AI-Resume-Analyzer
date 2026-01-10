import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register';
import OAuthSuccess from '../pages/OAuthSuccess';
import Dashboard from '../pages/Dashboard.jsx';
import Upload from '../pages/Upload.jsx';
import Report from '../pages/Report.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/upload" element={
                <ProtectedRoute>
                    <Upload />
                </ProtectedRoute>
            } />
            <Route path="/report" element={
                <ProtectedRoute>
                    <Report />
                </ProtectedRoute>
            } />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    )
}
