import React from 'react';
import { MdLocationOn, MdCheckCircle, MdCancel, MdAccessTimeFilled } from 'react-icons/md';
import { FaHandshake, FaMoneyBillWave } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';

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

const WishlistedPropertyCard = ({ property }) => {
    const {
        _id,
        propertyId,
        propertyImage,
        propertyTitle,
        propertyLocation,
        agentName,
        agentImage,
        verificationStatus,
        priceRange
    } = property;

    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.delete(`/wishlists/${_id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Removed from wishlist!',
                timer: 1500,
            });
            queryClient.invalidateQueries(['my-wishlist']);
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Deletion failed',
                text: err.message,
                timer: 1000
            });
        }
    });

    const handleRemove = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to remove this property from your wishlist?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate();
            }
        });
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full transition hover:shadow-xl">
            <div className="relative h-36 md:h-48 w-full overflow-hidden">
                <img
                    src={propertyImage}
                    alt={propertyTitle}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/e0e0e0/333333?text=No+Image";
                    }}
                />
                {getStatusBadge(verificationStatus)}
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
                <h3 className="text-lg font-bold text-gray-800">{propertyTitle}</h3>
                <p className="flex items-center gap-1 text-sm text-gray-600">
                    <MdLocationOn /> {propertyLocation}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMoneyBillWave className="text-green-600" />
                    ৳ {priceRange.minPrice.toLocaleString()} - {priceRange.maxPrice.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-4">
                    <img
                        src={agentImage}
                        alt={agentName}
                        className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs md:text-sm font-medium">
                        {agentName}
                    </span>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    <Link
                        to={`/dashboard/make-offer/${propertyId}`}
                        className="btn btn-sm btn-outline btn-primary flex items-center justify-center gap-1"
                    >
                        <FaHandshake /> Make an Offer
                    </Link>
                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={deleteMutation.isPending}
                        className="btn btn-sm btn-outline btn-error flex items-center justify-center gap-1"
                    >
                        <AiOutlineDelete /> {deleteMutation.isPending ? 'Removing...' : 'Remove'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistedPropertyCard;
