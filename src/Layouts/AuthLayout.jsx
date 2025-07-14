import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            Auth Layout
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;