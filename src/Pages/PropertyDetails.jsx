import React from 'react';
import { useParams } from 'react-router';
import usePropertyById from '../Hooks/usePropertyById';
import {
    MdLocationOn,
    MdPerson,
    MdEmail,
    MdCheckCircle,
    MdCancel,
    MdAccessTimeFilled
} from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import PropertyReviewSection from '../Components/PropertyReviewSection';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import Swal from 'sweetalert2';
import useUserRole from '../Hooks/useUserRole';

const getStatusBadge = (status) => {
    switch (status) {
        case 'verified':
            return (
                <span className="badge bg-green-500 text-white flex items-center gap-1 px-2 py-1 text-xs shadow">
                    <MdCheckCircle /> Verified
                </span>
            );
        case 'rejected':
            return (
                <span className="badge bg-red-500 text-white flex items-center gap-1 px-2 py-1 text-xs shadow">
                    <MdCancel /> Rejected
                </span>
            );
        case 'pending':
        default:
            return (
                <span className="badge bg-yellow-500 text-white flex items-center gap-1 px-2 py-1 text-xs shadow">
                    <MdAccessTimeFilled /> Pending
                </span>
            );
    }
};

const PropertyDetails = () => {
    const { id } = useParams();
    const {
        data: property,
        isLoading,
        isError,
        error
    } = usePropertyById(id);

    const { user } = useAuth();

    const {role, isLoading: roleLoading} = useUserRole(user.email);

    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    const { data: wishlistItem = [] } = useQuery({
        queryKey: ['wishlist', id, user?.email],
        enabled: !!id && !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get(`/wishlists-by-userEmail-id?propertyId=${id}&userEmail=${user.email}`);
            return res.data;
        }
    });

    const addToWishlistMutation = useMutation({
        mutationFn: async (newWishlistItem) => {
            const res = await axiosInstance.post('/wishlists', newWishlistItem);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist', id, user?.email]);
            Swal.fire({ icon: 'success', title: 'Added to wishlist!', timer: 1000 });
        },
        onError: (err) => {
            Swal.fire({ icon: 'error', title: 'Error', text: err.message });
        }
    });

    const handleAddToWishlist = () => {
        const newItem = {
            propertyId: id,
            userEmail: user.email,
            propertyImage: property.image,
            propertyTitle: property.title,
            propertyLocation: property.location,
            agentName: property.agentName,
            agentEmail: property.agentEmail,
            agentImage: property.agentImage,
            verificationStatus: property.status,
            priceRange: property.price,
            addedAt: new Date().toISOString()
        };

        addToWishlistMutation.mutate(newItem);
    };

    const containerClass =
        'w-11/12 md:container mx-auto rounded-md overflow-hidden bg-white min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] py-8 px-4 md:px-8';

    if (isLoading) {
        return <p className={`text-center ${containerClass}`}>Loading property details...</p>;
    }

    if (isError) {
        const isNotFound = error?.response?.status === 404;
        return (
            <div className={`text-center text-red-500 text-lg font-semibold ${containerClass}`}>
                {isNotFound
                    ? '❌ Property not found. Please check the ID.'
                    : `⚠️ Something went wrong: ${error.message}`}
            </div>
        );
    }

    const {
        _id,
        title,
        location,
        image,
        agentName,
        agentEmail,
        agentImage,
        price,
        status
    } = property;

    return (
        <div className={containerClass}>
            <div className='flex flex-col md:flex-row gap-6'>

                {/* Image Section */}
                <div className='md:w-1/2 h-64 md:h-[400px] overflow-hidden rounded-lg shadow'>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400/e0e0e0/333333?text=No+Image";
                        }}
                    />
                </div>

                {/* Info Section */}
                <div className='md:w-1/2 flex flex-col justify-between'>
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
                        <p className="flex items-center gap-2 text-gray-600 text-sm">
                            <MdLocationOn className="text-xl text-primary" /> {location}
                        </p>
                        <p className="flex items-center gap-2 text-gray-600 text-sm">
                            <FaMoneyBillWave className="text-lg text-green-600" />
                            $ {price.minPrice.toLocaleString()} - {price.maxPrice.toLocaleString()}
                        </p>
                        <div className='flex items-center gap-2'>
                            {getStatusBadge(status)}
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                            <img
                                src={agentImage}
                                alt={agentName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="flex items-center gap-1 text-sm font-medium">
                                    <MdPerson /> {agentName}
                                </p>
                                <p className="flex items-center gap-1 text-xs text-gray-600">
                                    <MdEmail /> {agentEmail}
                                </p>
                            </div>
                        </div>
                    </div>

                    {wishlistItem && wishlistItem.length > 0 ? (
                        <button className='btn btn-success text-white mt-6 w-full md:w-2/3 btn-sm md:btn-md'>
                            Added to Wishlist
                        </button>
                    ) : (
                        <button
                            className='btn btn-primary mt-6 w-full md:w-2/3 text-white btn-sm md:btn-md'
                            onClick={handleAddToWishlist}
                            disabled={addToWishlistMutation.isPending || roleLoading || role!=="user"}
                        >
                            {addToWishlistMutation.isPending ? 'Adding...' : 'Add to Wishlist'}
                        </button>
                    )}
                </div>
            </div>
            <div className='mt-10'>
                <PropertyReviewSection propertyId={_id} propertyTitle={title} />
            </div>
        </div>
    );
};

export default PropertyDetails;