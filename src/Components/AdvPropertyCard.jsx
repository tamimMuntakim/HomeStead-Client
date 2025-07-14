// src/components/AdvPropertyCard.jsx
import React from 'react';
// You can use a simple SVG for the checkmark icon, or if you have Font Awesome, use its icon.
// For this example, I'll use a simple inline SVG.

const AdvPropertyCard = ({
    imageSrc,
    location,
    priceRange,
    isVerified,
}) => {
    return (
        <div className="card bg-base-200 shadow-md rounded-box overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
            {/* Property Image */}
            <figure className="h-48 w-full overflow-hidden">
                <img
                    src={imageSrc}
                    alt={`Property in ${location}`}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    // Fallback image in case the provided image fails to load
                    onError={(e) => {
                        e.target.onerror = null; // Prevents infinite loop if fallback also fails
                        e.target.src = "https://placehold.co/400x200/e0e0e0/333333?text=No+Image";
                    }}
                />
            </figure>

            <div className="card-body px-6 py-3">
                {/* Location */}
                <h3 className="card-title text-xl font-semibold text-gray-800 mb-2">
                    {location}
                </h3>

                {/* Price Range */}
                <p className="text-md font-semibold mb-3">
                    {priceRange}
                </p>

                {/* Verification Status */}
                <div className="flex items-center text-success-content text-sm font-medium mb-4">
                    {isVerified && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1 text-success"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                    <span>{isVerified ? 'Verified Property' : 'Verification Pending'}</span>
                </div>

                {/* See Details Button */}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm rounded-md w-full">
                        See Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvPropertyCard;