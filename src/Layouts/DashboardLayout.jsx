import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import DashboardMenu from '../Components/DashboardMenu';

const DashboardLayout = () => {
    return (
        <>
            <header className='py-2 md:py-3 sticky top-0 z-50 bg-[#e8f0ff]'>
                <nav className='w-11/12 md:container mx-auto bg-white rounded-md md:px-2'>
                    <Navbar></Navbar>
                </nav>
            </header>
            <main className='w-11/12 md:container mx-auto md:h-[calc(100vh-96px)] md:grid md:grid-cols-12 md:gap-4 space-y-4 md:space-y-0'>
                <aside className=' md:col-span-2 flex justify-center bg-blue-400 text-white rounded-md overflow-hidden'>
                    <div className="md:h-full md:sticky top-[calc(96px)] md:flex md:items-center w-full">
                        <DashboardMenu></DashboardMenu>
                    </div>
                </aside>
                <div className='md:col-span-10 md:h-full md:overflow-y-auto bg-white rounded-md overflow-hidden'>
                    <Outlet></Outlet>
                </div>
            </main>
            <footer className='mt-4 md:mt-8 bg-[#000018]'>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default DashboardLayout;