import React from "react";
import { TiTickOutline } from "react-icons/ti";

const AboutUs = () => {
    return (
        <section id="about-us" className="w-11/12 md:container mx-auto rounded-md overflow-hidden shadow-xl bg-white px-4 py-8 md:px-12 md:py-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 md:order-first order-last">
                    <h2 className="text-2xl lg:text-4xl font-bold text-accent mb-6">
                        About <span className="text-primary">HomeStead</span>
                    </h2>
                    <p className="lg:text-lg text-accent mb-4 leading-relaxed">
                        At HomeStead, we believe that finding the perfect property should
                        be simple, transparent, and enjoyable. Whether you're buying,
                        selling, or renting, our mission is to connect you with trusted
                        agents and seamless property solutions.
                    </p>
                    <p className="lg:text-lg text-accent mb-4 leading-relaxed">
                        Our platform empowers property seekers with powerful search
                        tools, easy management, and fair opportunities for both clients
                        and agents. We are committed to building trust, innovation, and
                        long-term relationships in the real estate industry.
                    </p>
                    <ul className="space-y-2 text-accent font-medium text-sm md:text-base">
                        <li className="flex items-center md:gap-2"><TiTickOutline className="text-primary"/> Trusted & Verified Agents</li>
                        <li className="flex items-center md:gap-2"><TiTickOutline className="text-primary"/> Easy Property Management</li>
                        <li className="flex items-center md:gap-2"><TiTickOutline className="text-primary"/> Secure Transactions</li>
                        <li className="flex items-center md:gap-2"><TiTickOutline className="text-primary"/> Seamless User Experience</li>
                    </ul>
                </div>

                <div className="order-first md:order-last">
                    <img
                        src="https://i.ibb.co/ZzyKHDcQ/home-Stead-Logo.png"
                        alt="About HomeStead"
                        className="rounded-xl shadow-xl object-cover w-full h-auto border border-gray-200"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
