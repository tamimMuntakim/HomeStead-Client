import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';

const MakeOffer = () => {
    const { id } = useParams(); // id = wishlist item id
    const navigate = useNavigate();

    const { user } = useAuth();
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    const [offerAmount, setOfferAmount] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    // Fetch wishlist item by id to get property info
    const { data: wishlistItem, isLoading } = useQuery({
        queryKey: ['wishlist-item', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/wishlists-by-userEmail-id?userEmail=${user.email}&propertyId=${id}`);
            // The backend returns an array; pick first item if exists
            return res.data.length > 0 ? res.data[0] : null;
        },
        enabled: !!user?.email && !!id,
    });

    // Set price range for offer amount input once wishlistItem loads
    useEffect(() => {
        if (wishlistItem?.priceRange) {
            setMinPrice(wishlistItem.priceRange.minPrice);
            setMaxPrice(wishlistItem.priceRange.maxPrice);
            setOfferAmount(wishlistItem.priceRange.minPrice); // default to minPrice
        }
    }, [wishlistItem]);

    // Mutation to post offer
    const offerMutation = useMutation({
        mutationFn: async (newOffer) => {
            const res = await axiosInstance.post('/offers', newOffer);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Offer submitted successfully!',
                timer: 1500,
            });
            queryClient.invalidateQueries(['offers']);
            navigate('/dashboard/properties-bought'); // Or wherever you want to go
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to submit offer',
                text: err.message,
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!offerAmount) {
            return Swal.fire({ icon: 'error', title: 'Offer amount is required' });
        }

        if (offerAmount < minPrice || offerAmount > maxPrice) {
            return Swal.fire({
                icon: 'error',
                title: 'Invalid offer amount',
                text: `Offer must be between ৳${minPrice.toLocaleString()} and ৳${maxPrice.toLocaleString()}`,
            });
        }

        const newOffer = {
            propertyId: wishlistItem.propertyId,
            propertyTitle: wishlistItem.propertyTitle,
            propertyLocation: wishlistItem.propertyLocation,
            agentName: wishlistItem.agentName,
            buyerEmail: user.email,
            buyerName: user.displayName,
            offerAmount: Number(offerAmount),
            buyingDate: new Date(e.target.buyingDate.value).toISOString(),
            offerDate: new Date().toISOString(),
            status: 'pending'
        };

        offerMutation.mutate(newOffer);
    };

    if (isLoading) return <p className="text-center mt-10">Loading offer form...</p>;

    if (!wishlistItem) return <p className="text-center mt-10 text-red-500">Wishlist item not found.</p>;

    return (
        <div className="max-w-xl mx-auto bg-white p-6 shadow-xl rounded-lg mt-4 md:mt-8">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary">Make an Offer</h2>
            <form onSubmit={handleSubmit}>
                {/* Property Title */}
                <div className="form-control mb-4">
                    <label className="label font-semibold">Property Title</label>
                    <input
                        type="text"
                        readOnly
                        value={wishlistItem.propertyTitle}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Property Location */}
                <div className="form-control mb-4">
                    <label className="label font-semibold">Property Location</label>
                    <input
                        type="text"
                        readOnly
                        value={wishlistItem.propertyLocation}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Agent Name */}
                <div className="form-control mb-4">
                    <label className="label font-semibold">Agent Name</label>
                    <input
                        type="text"
                        readOnly
                        value={wishlistItem.agentName}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Offer Amount */}
                <div className="form-control mb-4">
                    <label className="label font-semibold">
                        Offer Amount (৳)
                        <span className="text-sm text-gray-500 ml-2">
                            Range: ৳{minPrice.toLocaleString()} - ৳{maxPrice.toLocaleString()}
                        </span>
                    </label>
                    <input
                        type="number"
                        name="offerAmount"
                        value={offerAmount}
                        min={minPrice}
                        max={maxPrice}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Buyer Email */}
                <div className="form-control mb-4">
                    <label className="label font-semibold">Buyer Email</label>
                    <input
                        type="email"
                        readOnly
                        value={user.email}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Buyer Name */}
                <div className="form-control mb-4">
                    <label className="label font-semibold">Buyer Name</label>
                    <input
                        type="text"
                        readOnly
                        value={user.displayName}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Buying Date */}
                <div className="form-control mb-6">
                    <label className="label font-semibold">Buying Date</label>
                    <input
                        type="date"
                        name="buyingDate"
                        required
                        className="input input-bordered w-full"
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-white"
                    disabled={offerMutation.isPending}
                >
                    {offerMutation.isPending ? 'Submitting...' : 'Submit Offer'}
                </button>
            </form>
        </div>
    );
};

export default MakeOffer;
