import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import OfferedPropertyCard from '../Components/OfferedPropertyCard'; // This component should show each offer

const PropertiesBought = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: allOffers = [], isLoading } = useQuery({
        queryKey: ['my-offers', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/offers?buyerEmail=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <div className="text-center py-10 font-semibold">Loading your offers...</div>;
    }

    return (
        <>
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary mt-4 md:mt-8">
                Properties Bought
            </h2>

            {allOffers.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-10">
                    You haven't made any offers yet.
                </div>
            ) : (
                <div className="grid gap-6 px-4 md:px-10 py-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {allOffers.map((offer) => (
                        <OfferedPropertyCard key={offer._id} offer={offer} />
                    ))}
                </div>
            )}
        </>
    );
};

export default PropertiesBought;
