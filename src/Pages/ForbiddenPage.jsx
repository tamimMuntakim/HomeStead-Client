import React from 'react';
import { Link } from 'react-router';
import { MdBlock } from 'react-icons/md';
import { IoChevronBackCircleOutline } from 'react-icons/io5';

const ForbiddenPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 w-11/12 md:container mx-auto rounded-md">
            <div className="text-center">
                <div className="flex justify-center text-red-600 mb-4">
                    <MdBlock size={80} />
                </div>
                <h1 className="text-6xl font-bold text-red-600">403</h1>
                <h2 className="text-2xl md:text-3xl font-semibold mt-2 text-gray-800">Access Forbidden</h2>
                <p className="mt-4 text-gray-500">
                    You do not have permission to view this page. <br />
                    Please contact the administrator if you believe this is an error.
                </p>
                <Link to="/" className="text-primary flex items-center justify-center gap-2 link link-hover text-lg md:text-xl">
                    <IoChevronBackCircleOutline />
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default ForbiddenPage;
