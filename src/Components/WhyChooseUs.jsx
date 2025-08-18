// src/components/WhyChooseUs.jsx
import React from 'react';
// Import icons from react-icons. You can choose different icon sets!
// Examples: { FaHouseDamage, FaSearchDollar, FaShieldAlt, FaHandsHelping } from 'react-icons/fa';
// Or: { MdHouse, MdSearch, MdSecurity, MdSupportAgent } from 'react-icons/md';
// For this example, I'll use a mix for variety or just stick to one for consistency.
import { FaHouseUser, FaSearchLocation, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import { PiSealQuestionFill } from "react-icons/pi";

const WhyChooseUs = () => {
    const features = [
        {
            icon: FaHouseUser, // Icon component from react-icons
            title: "Effortless Property Management",
            description: "Manage your listings, tenants, and finances with an intuitive dashboard designed for simplicity and efficiency. Save time and reduce stress.",
        },
        {
            icon: FaSearchLocation, // Icon component
            title: "Smart & Personalized Search",
            description: "Find your dream property faster with advanced search filters, personalized recommendations, and detailed insights that match your exact needs.",
        },
        {
            icon: FaShieldAlt, // Icon component
            title: "Secure & Verified Transactions",
            description: "Experience peace of mind with our robust verification processes for properties and users, ensuring trustworthy and secure transactions every time.",
        },
        {
            icon: FaHeadset, // Icon component
            title: "Dedicated Expert Support",
            description: "Our knowledgeable support team is always ready to assist you. From listing queries to legal advice, we're here to help every step of the way.",
        },
    ];

    return (
        <section className="py-10 bg-white text-accent">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 flex items-center justify-center">
                    Why Choose HomeStead <PiSealQuestionFill className='hidden md:inline ml-1 md:ml-2'/>
                </h2>
                {/* Subheading */}
                <p className="text-sm md:text-base text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
                    We're more than just a platform; we're your partner in real estate. Discover the HomeStead difference.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4 md:p-6 bg-base-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-base-200 border-2">
                            {/* Icon */}
                            <feature.icon className="text-primary text-3xl md:text-5xl mb-4 md:mb-6" /> {/* Use feature.icon as a component */}

                            {/* Title */}
                            <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-3">{feature.title}</h3>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed text-xs md:text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;