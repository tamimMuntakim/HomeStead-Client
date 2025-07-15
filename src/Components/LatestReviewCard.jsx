// src/components/LatestReviewCard.jsx
import React from 'react';

const LatestReviewCard = ({ reviewerName, reviewerImage, reviewDescription, propertyTitle }) => {
    return (
        <div className="card bg-base-100 shadow-md md:shadow-xl rounded-box px-3 py-2 md:px-5 md:py-3 hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center mb-2 md:mb-4">
                {/* Reviewer Image */}
                <div className="avatar mr-2 md:mr-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden">
                        <img
                            src={reviewerImage}
                            alt={reviewerName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/150x150/cccccc/333333?text=User"; // Fallback image
                            }}
                        />
                    </div>
                </div>
                {/* Reviewer Name */}
                <div>
                    <h3 className="md:text-xl font-semibold text-gray-800">{reviewerName}</h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">Reviewed for:</p>
                    {/* Property Title */}
                    <p className="text-sm md:text-md font-medium text-gray-900">{propertyTitle}</p>
                </div>
            </div>

            {/* Review Description */}
            <p className="text-gray-700 leading-relaxed mb-2 md:mb-4 italic text-sm md:text-base">
                "{reviewDescription}"
            </p>

            {/* You could add a star rating here if you expand the data later */}
            <div className="rating rating-sm">
                <input type="radio" name="rating-2" className="text-xs md:text-sm mask mask-star-2 bg-orange-400" checked disabled />
                <input type="radio" name="rating-2" className="text-xs md:text-sm mask mask-star-2 bg-orange-400" disabled />
                <input type="radio" name="rating-2" className="text-xs md:text-sm mask mask-star-2 bg-orange-400" disabled />
                <input type="radio" name="rating-2" className="text-xs md:text-sm mask mask-star-2 bg-orange-400" disabled />
                <input type="radio" name="rating-2" className="text-xs md:text-sm mask mask-star-2 bg-orange-400" disabled />
            </div>
        </div>
    );
};

export default LatestReviewCard;