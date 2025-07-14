import React from 'react';
import { Link, NavLink } from 'react-router';
import "./NavBar.css"
import Logo from './Logo';

const Navbar = () => {
    const navLinks =
        <>
            <li><NavLink className="navbar-navs" to="/">Home</NavLink></li>
            <li><NavLink className="navbar-navs" to="/all-properties">All Properties</NavLink></li>
            <li><NavLink className="navbar-navs" to="/dashboard">Dashboard</NavLink></li>
        </>
    return (
        <div className="navbar bg-white rounded-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden px-0 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-32 py-2 gap-1 shadow-lg">
                        {navLinks}
                    </ul>
                </div>
                <Link className="flex text-lg md:text-xl items-center" to={"/"}>
                    <Logo></Logo>
                </Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal gap-2">
                    {
                        navLinks
                    }
                </ul>
            </div>

            {/* Right Section: Login Button */}
            <div className="navbar-end">
                <Link className="btn btn-sm text-white btn-primary" to="/auth/login">Login</Link>
            </div>
        </div>
    );
};

export default Navbar;