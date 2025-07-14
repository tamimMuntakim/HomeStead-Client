import React from 'react';
import Lottie from 'lottie-react';
// Assuming your lottie file is in src/assets/banner_lottie.json
// You might need to adjust the import path based on your exact file structure.
import bannerLottie from '../assets/Lotties/banner_lottie.json';

const Banner = () => {
    // Define the height dynamically based on screen size
    // For larger screens: min-height of viewport minus 82px (navbar height)
    // For smaller screens: 60vh
    const bannerHeightClass = 'md:min-h-[calc(100vh-150px)] min-h-[60vh]';

    return (
        <section
            className={`relative bg-cover bg-center bg-no-repeat ${bannerHeightClass} flex items-center justify-center text-white`}
            style={{
                // Replace 'your-dark-background-image.jpg' with your actual image path
                // For now, using a dark background color as a placeholder
                backgroundImage: 'url("https://i.ibb.co/4gJzFQwG/Home-Stead-banner.jpg")',
                // Ensure the background is very dark, even if the image is light
                backgroundColor: '#1a1a1a', // Fallback dark color
            }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="relative z-10 mx-auto px-4 py-8 md:px-12 md:py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-8">
                <div className="w-full md:w-2/5 flex justify-center items-center order-first md:order-last">
                    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                        <Lottie animationData={bannerLottie} loop={true} />
                    </div>
                </div>
                <div className="w-full md:w-3/5 text-center md:text-left order-last md:order-first">
                    <h1 className="text-2xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
                        Your Dream Real State Awaits
                    </h1>
                    <p className="lg:text-xl mb-8 opacity-70 drop-shadow-md">
                        Discover, manage, and thrive in the perfect property with HomeStead.
                        Seamless solutions for every step of your real estate journey.
                    </p>
                    <button className="btn btn-primary btn-sm md:btn-md shadow-xl hover:scale-105 transition-transform duration-300 text-white">
                        Explore Properties
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Banner;