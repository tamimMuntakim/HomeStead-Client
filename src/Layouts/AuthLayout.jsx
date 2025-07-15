import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';

const AuthLayout = () => {
    return (
        <>
            <header className='py-2 md:py-3 sticky top-0 z-50 bg-[#e8f0ff]'>
                <nav className='w-11/12 md:container mx-auto bg-white rounded-md md:px-2'>
                    <Navbar></Navbar>
                </nav>
            </header>
            <main className='md:min-h-[calc(100vh-96px)] min-h-[calc(80px)] w-11/12 md:container mx-auto'>
                <Outlet></Outlet>
            </main>
        </>
    );
};

export default AuthLayout;