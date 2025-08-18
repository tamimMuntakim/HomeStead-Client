import React from 'react';
import useVerifiedProperties from '../Hooks/useVerifiedProperties';
import { MdLocationOn } from 'react-icons/md';

const AvailableLocations = () => {
    const { data: properties = [], isLoading, isError } = useVerifiedProperties();

    if (isLoading) return <p className="text-center py-10">Loading locations...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load locations.</p>;

    const uniqueLocations = [...new Set(properties.map(p => p.location).filter(Boolean))];

    return (
        <section className="py-10 bg-white">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-primary mb-6 flex items-center justify-center">
                Available Locations <MdLocationOn className="hidden md:inline ml-2" />
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-4">
                {uniqueLocations.map((loc, idx) => (
                    <div
                        key={idx}
                        className="px-4 py-2 bg-primary text-white rounded-lg shadow-md text-xs md:text-base font-medium  hover:shadow-xl transition text-center"
                    >
                        {loc}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AvailableLocations;
