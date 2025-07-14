import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const HomeLayout = () => {
    return (
        <>
            <header className='py-2 md:py-4 sticky top-0 z-50 bg-[#e8f0ff]'>
                <nav className='w-11/12 md:container mx-auto bg-white rounded-md md:px-2'>
                    <Navbar></Navbar>
                </nav>
            </header>
            <main className=''>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default HomeLayout;