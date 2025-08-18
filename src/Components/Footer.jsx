import React from 'react';
import { Link } from 'react-router';
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Logo from './FooterLogo';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';

const Footer = () => {
    const { user } = useAuth();
    const { role, isLoading: roleLoading } = useUserRole(user?.email);

    return (
        <footer className="footer sm:footer-horizontal text-neutral-content py-10 w-11/12 md:container mx-auto">
            <aside className='space-y-1 md:space-y-2'>
                <Link className="flex text-lg md:text-xl items-center" to={"/"}>
                    <Logo></Logo>
                </Link>
                <p className=''>Your all-in-one platform for seamless property discovery and management.</p>
                <p className='text-slate-400'>Copyright © {new Date().getFullYear()} - All right reserved by HomeStead Corporation Ltd.</p>
                <nav className="flex flex-wrap gap-2 md:gap-4 justify-center items-center">
                    <Link className="link link-hover" to="/">Home</Link>
                    <Link className="link link-hover" to="/all-properties" >All Properties</Link>
                    {
                        user && !roleLoading && role && (
                            <Link className="link link-hover" to="/dashboard" >Dashboard</Link>
                        )
                    }
                    <Link className="link link-hover" to="/about-us" >About Us</Link>
                    <Link className="link link-hover" to="/contact-us" >Contact Us</Link>
                </nav>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4 md:gap-8">
                    <a href="https://www.facebook.com/tamim.muntakim.02" target='_blank'><FaFacebookSquare className='w-4 h-4 md:w-6 md:h-6' /></a>
                    <a href="https://www.linkedin.com/in/tamim-muntakim-51052625a/" target='_blank'><FaLinkedin className='w-4 h-4 md:w-6 md:h-6' /></a>
                    <a href="https://github.com/tamimMuntakim" target='_blank'><FaGithub className='w-4 h-4 md:w-6 md:h-6' /></a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;