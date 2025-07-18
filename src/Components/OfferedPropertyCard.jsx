import React from 'react';
import { MdLocationOn, MdCheckCircle, MdCancel, MdAccessTimeFilled } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const getStatusBadge = (status) => {
    switch (status) {
        case 'pending':
            return (
                <span className="absolute top-2 right-2 badge bg-yellow-500 text-white flex items-center gap-1 px-3 py-2 text-xs shadow">
                    <MdAccessTimeFilled /> Pending
                </span>
            );
        case 'accepted':
            return (
                <span className="absolute top-2 right-2 badge bg-green-600 text-white flex items-center gap-1 px-3 py-2 text-xs shadow">
                    <MdCheckCircle /> Accepted
                </span>
            );
        case 'rejected':
            return (
                <span className="absolute top-2 right-2 badge bg-red-500 text-white flex items-center gap-1 px-3 py-2 text-xs shadow">
                    <MdCancel /> Rejected
                </span>
            );
        case 'bought':
            return (
                <span className="absolute top-2 right-2 badge bg-blue-500 text-white flex items-center gap-1 px-3 py-2 text-xs shadow">
                    <MdCheckCircle /> Bought
                </span>
            );
        default:
            return null;
    }
};

const OfferedPropertyCard = ({ offer }) => {
    const {
        _id,
        propertyTitle,
        propertyLocation,
        propertyImage,
        agentName,
        offerAmount,
        status
    } = offer;

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full transition hover:shadow-xl">
            <div className="relative h-36 md:h-48 w-full overflow-hidden">
                <img
                    src={propertyImage || "https://placehold.co/600x400/e0e0e0/333333?text=No+Image"}
                    alt={propertyTitle}
                    className="w-full h-full object-cover object-center"
                />
                {getStatusBadge(status)}
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
                <h3 className="text-lg font-bold text-gray-800">{propertyTitle}</h3>
                <p className="flex items-center gap-1 text-sm text-gray-600">
                    <MdLocationOn /> {propertyLocation}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMoneyBillWave className="text-green-600" />
                    Offer: $ {offerAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Agent: {agentName}</p>

                {status === 'accepted' && (
                    <div className="flex justify-end mt-4">
                        <Link
                            to={`/dashboard/payment/${_id}`}
                            className="btn btn-sm btn-outline btn-success"
                        >
                            Pay Now
                        </Link>
                    </div>
                )}

                {status === 'bought' && offer.transactionId && (
                    <div className="flex justify-end mt-4">
                        <span
                            className="badge badge-success text-xs md:text-sm shadow-sm text-white cursor-pointer"
                            data-tooltip-id={`txid-${offer._id}`}
                            data-tooltip-content={offer.transactionId}
                        >
                            Txn ID: {offer.transactionId.slice(0, 5)}****{offer.transactionId.slice(-4)}
                        </span>

                        <Tooltip id={`txid-${offer._id}`} place="bottom" className='text-xs md:text-sm'/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferedPropertyCard;
