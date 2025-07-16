import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import WishlistedPropertyCard from '../Components/WishlistedPropertyCard';

const MyWishlist = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/wishlists-by-userEmail?userEmail=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <div className="text-center py-10 font-semibold">Loading your wishlist...</div>;
    }

    return (
        <>
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary mt-4 md:mt-8">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-10">
                    You haven't added any properties to your wishlist yet.
                </div>
            ) : (
                <div className="grid gap-6 px-4 md:px-10 py-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {wishlist.map(item => (
                        <WishlistedPropertyCard key={item._id} property={item} />
                    ))}
                </div>
            )}
        </>
    );
};

export default MyWishlist;
