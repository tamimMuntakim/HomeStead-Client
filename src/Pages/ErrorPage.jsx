// src/pages/ErrorPage.jsx (or src/components/ErrorPage.jsx)
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // A common warning/error icon
import { Link } from 'react-router'; // Assuming you use react-router-dom for navigation
import { IoChevronBackCircleOutline } from "react-icons/io5";

const ErrorPage = () => {
    return (
        // Main container: min-height of screen, flexbox for centering content
        <div className="min-h-screen flex items-center justify-center text-gray-800 p-4 bg-[#e8f0ff]">
            <title>HomeStead || 404 Not Found</title> {/* Hardcoded title */}

            {/* Error Content Card */}
            <div className="text-center bg-white shadow-xl rounded-lg p-8 md:p-12 max-w-lg w-full">
                {/* Error Icon */}
                <FaExclamationTriangle className="text-red-600 text-6xl md:text-8xl mx-auto mb-6 animate-pulse-slow" />

                {/* Hardcoded 404 Status Code / Main Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-red-500 mb-4">
                    404 Not Found
                </h1>

                {/* Hardcoded Error Message */}
                <p className="md:text-lg text-gray-700 mb-8 leading-relaxed">
                    The page you are looking for does not exist.
                </p>

                {/* Call to Action Button */}
                <Link to="/" className="text-primary flex items-center justify-center gap-2 link link-hover text-lg md:text-xl">
                    <IoChevronBackCircleOutline />
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;