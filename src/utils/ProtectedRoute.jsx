import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLocalHostLogin} from '../components/Login/LocalHostLoginProvider'

const ProtectedRoute = () => {
    const { isLoggedIn } = useLocalHostLogin();
    
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;