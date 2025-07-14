import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';

const HomeLayout = () => {
    return (
        <>
            <header className='pt-2 md:pt-4'>
                <nav className='w-11/12 md:container mx-auto bg-white rounded-md md:px-2'>
                    <Navbar></Navbar>
                </nav>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>

            </footer>
        </>
    );
};

export default HomeLayout;