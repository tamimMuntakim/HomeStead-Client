// src/components/Faq.jsx
import React from 'react';
import FaqCard from './FaqCard'; // Ensure the path is correct
import { FcQuestions } from "react-icons/fc";

const Faq = () => {
    // Updated FAQ content relevant to real estate management
    const faqs = [
        {
            question: "How do I list my property on HomeStead?",
            answer: "Listing your property is simple! Log in to your dashboard, click 'List a Property', and follow the guided steps to upload details, photos, and set your preferences. Our team will review it before it goes live."
        },
        {
            question: "What are the fees for using HomeStead?",
            answer: "HomeStead offers various plans for property owners, including a free tier for basic listings and premium options with advanced features. For buyers/renters, Browse and applying are completely free. Detailed pricing is available on our 'Pricing' page."
        },
        {
            question: "How does HomeStead ensure property and user verification?",
            answer: "We prioritize trust and security. All listed properties undergo a verification process. Users are also verified through a robust system, including identity checks, to ensure a safe community for transactions and interactions."
        },
        {
            question: "Can I manage multiple properties from a single account?",
            answer: "Absolutely! HomeStead is designed for scalability. Property owners can easily add and manage multiple properties, tenants, and financial records all from a single, intuitive dashboard."
        },
        {
            question: "What kind of support does HomeStead offer?",
            answer: "We offer comprehensive support including a detailed help center, live chat during business hours, and email support. Our dedicated team is here to assist you with any queries or issues you may encounter."
        },
        {
            question: "Is my personal and property data secure on HomeStead?",
            answer: "Yes, data security is paramount. We use industry-standard encryption, secure servers, and strict privacy policies to protect your personal and property information. Your data is never shared without your consent."
        }
    ];

    return (
        <section className="py-10 bg-base-200"> {/* Added a section wrapper for consistent padding/bg */}
            <div className="container mx-auto px-4">
                <h2 className='text-4xl font-bold text-center text-primary mb-3 flex items-center justify-center'>Frequently Asked Questions<FcQuestions className='hidden md:inline ml-1 md:ml-2'/></h2>
                <p className="text-sm md:text-base text-center text-gray-500 mb-6 md:mb-12 max-w-2xl mx-auto">
                    Find quick answers to the most common questions about using HomeStead.
                </p>

                <div className="join join-vertical w-full rounded-md md:rounded-xl overflow-hidden text-sm md:text-base border border-base-300">
                    {
                        faqs.map((faq, index) => (
                            <FaqCard key={index} faq={faq} /> // Pass index for unique radio names
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Faq;