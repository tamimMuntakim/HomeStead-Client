import React, { useState } from 'react';
import useVerifiedProperties from '../Hooks/useVerifiedProperties';
import AllPropertyCard from '../Components/AllPropertyCard';

const AllProperties = () => {
    const [searchText, setSearchText] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

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

    const filtered = properties
        .filter((p) =>
            p.location.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price.minPrice - b.price.minPrice;
            } else if (sortOrder === 'desc') {
                return b.price.minPrice - a.price.minPrice;
            } else {
                return 0; // No sort
            }
        });

    return (
        <div className="w-11/12 md:container mx-auto rounded-md overflow-hidden bg-white min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] py-8 px-4 md:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-primary mb-6">
                All Properties
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 p-2 md:p-4 rounded-md shadow-md">
                <input
                    type="text"
                    placeholder="Search by location..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="input input-bordered w-full shadow"
                />

                <select
                    className="select select-bordered w-full shadow"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="default">Sort by price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                    No verified properties available right now.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((property) => (
                        <AllPropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProperties;
