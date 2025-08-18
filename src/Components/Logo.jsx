import React from 'react';

const Logo = () => {
    return (
        <>
            <img src="https://i.ibb.co/ZzyKHDcQ/home-Stead-Logo.png" alt="HomeStead Logo" className="h-10 w-10 mr-1 md:h-14 md:w-14 md:mr-2 rounded-full border-2 border-primary hidden md:inline" />
            <span className="md:ml-2 font-semibold text-primary font-logo">Home<span className='text-black font-logo'>Stead</span></span>
        </>
    );
};

export default Logo;