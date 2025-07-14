// src/components/AdvProperties.jsx
import React from 'react';
import AdvPropertyCard from './AdvPropertyCard'; // Make sure the path is correct

const AdvProperties = () => {
    // Hardcoded data for 4 placeholder properties
    const properties = [
        {
            id: 1,
            imageSrc: "https://i.ibb.co/4gJzFQwG/Home-Stead-banner.jpg",
            location: "Beverly Hills, CA",
            priceRange: "$2.5M - $5M",
            isVerified: true,
        },
        {
            id: 2,
            imageSrc: "https://i.ibb.co/4gJzFQwG/Home-Stead-banner.jpg",
            location: "Downtown, NYC",
            priceRange: "$3,000 - $6,000/month",
            isVerified: true,
        },
        {
            id: 3,
            imageSrc: "https://i.ibb.co/4gJzFQwG/Home-Stead-banner.jpg",
            location: "Suburbia, TX",
            priceRange: "$350K - $500K",
            isVerified: false,
        },
        {
            id: 4,
            imageSrc: "https://i.ibb.co/4gJzFQwG/Home-Stead-banner.jpg",
            location: "Financial District, LDN",
            priceRange: "$10,000 - $20,000/month",
            isVerified: true,
        },
    ];

    return (
        <section className="py-10 bg-base-100">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-center text-primary mb-3">
                    Featured Properties
                </h2>
                <p className="text-sm md:text-base text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    **Handpicked listings** for your next home or investment.
                </p>

                {/* Property Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {properties.map((property) => (
                        <AdvPropertyCard
                            key={property.id}
                            imageSrc={property.imageSrc}
                            location={property.location}
                            priceRange={property.priceRange}
                            isVerified={property.isVerified}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdvProperties;