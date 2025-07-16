import React from 'react';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loader';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader></Loader>;
    }
    else if (user && user.email) {
        return (children);
    } else {
        return <Navigate state={location.pathname} to="/auth/login"></Navigate>
    }
};

export default PrivateRoute;