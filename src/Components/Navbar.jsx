import React from 'react';
import { Link, NavLink } from 'react-router';
import "./NavBar.css"
import Logo from './Logo';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import useAuth from "../Hooks/useAuth";
import useUserRole from '../Hooks/useUserRole';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { role, isLoading: roleLoading } = useUserRole(user?.email);
    const navLinks =
        <>
            <li><NavLink className="navbar-navs" to="/">Home</NavLink></li>
            <li><NavLink className="navbar-navs" to="/all-properties">All Properties</NavLink></li>
            <li><NavLink className="navbar-navs" to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink className="navbar-navs" to="/about-us">About Us</NavLink></li>
            <li><NavLink className="navbar-navs" to="/contact-us">Contact Us</NavLink></li>
        </>

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Successfully Logged out!!",
                    timer: 1500
                });
            }).catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Please try again !!",
                    timer: 1500
                });
            });
    }
    return (
        <div className="navbar bg-white rounded-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden px-0 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
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
                <ul className="menu menu-horizontal gap-2 items-center">
                    {
                        navLinks
                    }
                </ul>
            </div>

            <div className="navbar-end text-xs md:text-sm">
                {user ?
                    (
                        <>
                            <a data-tooltip-id="my-tooltip" data-tooltip-content={
                                roleLoading ? user.displayName : `${user.displayName} - ${role}`
                            }>
                                <div className="avatar avatar-online">
                                    <div className="w-7 md:w-9 h-auto rounded-full">
                                        <img src={user.photoURL} />
                                    </div>
                                </div>
                            </a>
                            <Tooltip id="my-tooltip" />
                            <button onClick={handleLogout} className='btn btn-error text-white btn-sm md:btn-md md:font-bold md:w-[100px] ml-2 md:ml-4'>Logout</button>
                        </>)
                    :
                    (
                        <Link to="/auth/login" className='btn btn-primary text-white btn-sm md:btn-md md:font-bold md:w-[100px]'>Login</Link>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;