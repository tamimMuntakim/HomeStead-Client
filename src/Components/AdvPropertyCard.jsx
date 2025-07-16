import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router';

const AdvPropertyCard = ({ property }) => {
    const navigate = useNavigate();
    const {
        _id,
        image,
        location,
        price,
        status
    } = property;

    return (
        <div className="card bg-base-100 shadow-lg rounded-box overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <figure className="h-48 w-full overflow-hidden">
                <img
                    src={image}
                    alt={`Property in ${location}`}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x200/e0e0e0/333333?text=No+Image";
                    }}
                />
            </figure>

            <div className="card-body px-6 py-3">
                <h3 className="card-title text-xl font-semibold text-gray-800 mb-2">
                    {location}
                </h3>

                <p className="text-md font-semibold mb-3">
                    ৳ {price?.minPrice?.toLocaleString()} - {price?.maxPrice?.toLocaleString()}
                </p>

                <div className="flex items-center text-success-content text-sm font-medium mb-4">
                    {status === 'verified' && (
                        <MdCheckCircle className="h-5 w-5 mr-1 text-success" />
                    )}
                    <span>{status === 'verified' ? 'Verified Property' : 'Verification Pending'}</span>
                </div>

                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary btn-sm rounded-md w-full"
                        onClick={() => navigate(`/property-details/${_id}`)}
                    >
                        See Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvPropertyCard;
