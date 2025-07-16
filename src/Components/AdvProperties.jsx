import React from 'react';
import AdvPropertyCard from './AdvPropertyCard';
import { TbSpeakerphone } from "react-icons/tb";
import useVerifiedProperties from '../Hooks/useVerifiedProperties'; // Ensure this hook is created properly

const AdvProperties = () => {
    const { data: properties = [], isLoading } = useVerifiedProperties(4);

    return (
        <section className="py-10 bg-base-100">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-primary mb-3 flex items-center justify-center">
                    Advertized Properties <TbSpeakerphone className='hidden md:inline ml-1 md:ml-2' />
                </h2>
                <p className="text-sm md:text-base text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    **Handpicked listings** for your next home or investment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {isLoading ? (
                        <p className="text-center col-span-full">Loading...</p>
                    ) : (
                        properties.map((property) => (
                            <AdvPropertyCard key={property._id} property={property} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdvProperties;