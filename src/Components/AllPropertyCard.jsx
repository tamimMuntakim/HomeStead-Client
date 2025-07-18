import React from 'react';
import { FaMapMarkerAlt, FaMoneyBillAlt } from 'react-icons/fa';
import { MdCheckCircle, MdCancel, MdAccessTimeFilled } from 'react-icons/md';
import { Link } from 'react-router'; // react-router-dom is the usual lib for web routing

const getStatusBadge = (status) => {
    switch (status) {
        case 'pending':
            return (
                <span className="absolute top-2 right-2 badge bg-yellow-500 text-white flex items-center gap-1 px-3 py-2 text-xs shadow badge-xs md:badge-sm">
                    <MdAccessTimeFilled /> Pending
                </span>
            );
        case 'verified':
            return (
                <span className="absolute top-2 right-2 badge bg-green-500 text-white flex items-center gap-1 px-3 py-2 text-xs shadow">
                    <MdCheckCircle /> Verified
                </span>
            );
        case 'rejected':
            return (
                <span className="absolute top-2 right-2 badge bg-red-500 text-white flex items-center gap-1 px-3 py-2 text-xs shadow">
                    <MdCancel /> Rejected
                </span>
            );
        default:
            return null;
    }
};

const AllPropertyCard = ({ property }) => {
    const {
        _id,
        image,
        title,
        location,
        agentName,
        agentImage,
        status,
        price,
    } = property;

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full transition hover:shadow-xl relative">
            <div className="relative h-40 md:h-52 w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/e0e0e0/333333?text=No+Image";
                    }}
                />
                {getStatusBadge(status)}
            </div>

            <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="flex items-center gap-1 text-sm text-gray-600">
                    <FaMapMarkerAlt /> {location}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMoneyBillAlt className="text-green-600" />
                    $ {price?.minPrice?.toLocaleString()} - $ {price?.maxPrice?.toLocaleString()}
                </p>

                <div className="flex items-center gap-2 mt-4">
                    <img
                        src={agentImage}
                        alt={agentName}
                        className="w-7 h-7 rounded-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/40x40?text=Agent";
                        }}
                    />
                    <span className="text-sm font-medium text-gray-700">{agentName}</span>
                </div>

                <div className="mt-4 flex justify-end">
                    <Link
                        to={`/property-details/${_id}`}
                        className="btn btn-sm btn-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllPropertyCard;
