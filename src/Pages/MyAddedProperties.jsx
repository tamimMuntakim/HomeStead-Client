import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import AddedPropertyCard from '../Components/AddedPropertiesCard';

const MyAddedProperties = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: properties = [], isLoading } = useQuery({
        queryKey: ['my-properties', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/properties-by-agentEmail?agentEmail=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <div className="text-center py-10 font-semibold">Loading your properties...</div>;
    }

    return (
        <>
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary mt-4 md:mt-8">My Added Properties</h2>
            <div className="grid gap-6 px-4 md:px-10 py-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map(property => (
                    <AddedPropertyCard key={property._id} property={property} />
                ))}
            </div>
        </>
    );
};

export default MyAddedProperties;
