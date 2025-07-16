import React from 'react';
import useVerifiedProperties from '../Hooks/useVerifiedProperties';
import AllPropertyCard from '../Components/AllPropertyCard';

const AllProperties = () => {
    const { data: properties = [], isLoading, isError } = useVerifiedProperties();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 font-medium mt-12">
                Failed to load properties. Please try again later.
            </div>
        );
    }

    return (
        <div className="w-11/12 md:container mx-auto rounded-md overflow-hidden bg-white min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] py-8 px-4 md:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-primary mb-6">
                All Properties
            </h2>

            {properties.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                    No verified properties available right now.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <AllPropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProperties;
