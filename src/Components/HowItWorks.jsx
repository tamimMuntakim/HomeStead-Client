import React from 'react';
import { FaEye, FaHeart, FaMoneyBillWave, FaPlusCircle, FaCheckCircle, FaUserShield } from 'react-icons/fa';
import { MdOutlineHouse } from 'react-icons/md';

const HowItWorks = () => {
    const steps = [
        {
            role: 'Users',
            icon: FaEye,
            items: [
                'Browse verified properties.',
                'Add favorite properties to wishlist.',
                'Make offer from wishlist & pay via Stripe once accepted.',
            ],
        },
        {
            role: 'Agents',
            icon: FaPlusCircle,
            items: [
                'Add new properties for admin verification.',
                'Accept or reject offers made by users.',
            ],
        },
        {
            role: 'Admin',
            icon: FaUserShield,
            items: [
                'Verify agent properties.',
                'Mark agents as fraud if necessary.',
                'Manage users and control access.',
            ],
        },
    ];

    return (
        <section className="py-10 bg-white text-accent">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 flex items-center justify-center text-primary">
                    How It Works <MdOutlineHouse className='hidden md:inline ml-2'/>
                </h2>
                <p className="text-sm md:text-base text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Understand the workflow for Users, Agents, and Admins on HomeStead.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-6 bg-base-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-base-200">
                            {/* Icon */}
                            <step.icon className="text-primary text-3xl md:text-5xl mb-4 md:mb-6" />

                            {/* Role */}
                            <h3 className="text-xl md:text-2xl font-semibold mb-3">{step.role}</h3>

                            {/* Items */}
                            <div className="space-y-2 text-gray-700 text-sm md:text-base">
                                {step.items.map((item, i) => (
                                    <p key={i}>{item}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
