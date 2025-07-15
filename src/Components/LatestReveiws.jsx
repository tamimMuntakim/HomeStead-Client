// src/components/LatestReviews.jsx
import React from 'react';
import Marquee from 'react-fast-marquee'; // Import Marquee
import LatestReviewCard from './LatestReviewCard'; // Adjust path as needed

const LatestReviews = () => {
    // Hardcoded data for at least 3 latest user reviews
    // Added more reviews to make the marquee effect more apparent
    const reviews = [
        {
            id: 1,
            reviewerName: "Alice Johnson",
            reviewerImage: "https://i.ibb.co/QFXVZvRr/female1.png", // Placeholder image
            reviewDescription: "HomeStead made finding our new apartment incredibly easy! The process was smooth, and the support team was fantastic. Highly recommended!",
            propertyTitle: "Sunny Downtown Loft",
        },
        {
            id: 2,
            reviewerName: "Bob Williams",
            reviewerImage: "https://i.ibb.co/Tq4h3sB8/male1.png", // Placeholder image
            reviewDescription: "As a property owner, managing my rentals used to be a headache. HomeStead's tools are intuitive and have saved me so much time. Truly a game-changer!",
            propertyTitle: "Family House in Suburbia",
        },
        {
            id: 3,
            reviewerName: "Carla Davids",
            reviewerImage: "https://i.ibb.co/QFXVZvRr/female1.png", // Placeholder image
            reviewDescription: "The 'See Details' feature and detailed property descriptions helped us make a confident decision. We found our dream villa thanks to HomeStead.",
            propertyTitle: "Luxurious Lakeside Villa",
        },
        {
            id: 4,
            reviewerName: "David Lee",
            reviewerImage: "https://i.ibb.co/Tq4h3sB8/male1.png", // Placeholder image
            reviewDescription: "Excellent service from start to finish. Listing my property was straightforward, and the inquiries came in fast. Very pleased with the results!",
            propertyTitle: "Charming City Apartment",
        },
    ];

    return (
        <section
            className="py-10 text-white"
            // Using inline style to directly apply the primary color from your CSS variable
            // The `var()` fallback ensures it works even if --color-primary isn't globally accessible here.
            style={{ backgroundColor: 'var(--color-primary, #007FFF)' }}
        >
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-4xl font-bold text-center text-white mb-3">
                    What Our Users Say
                </h2>
                {/* Subheading */}
                <p className="text-sm md:text-base text-center text-slate-200 mb-12 max-w-2xl mx-auto">
                    Hear from our satisfied clients about their HomeStead experience.
                </p>

                {/* Marquee for Reviews */}
                {/*
          - speed: Controls the scrolling speed. Lower number means slower.
          - pauseOnHover: Pauses the marquee when the user hovers over it.
          - gradient: Creates a fade effect at the beginning/end of the marquee.
          - gradientColor: Set to RGB values of your primary color for a seamless fade.
          - gradientWidth: Adjusts the width of the fade effect.
        */}
                <Marquee
                    speed={40} // Slow speed, adjust as needed (e.g., 10-30 for slow)
                    pauseOnHover={true}
                    gradient={true}
                    gradientColor={[0, 127, 255]} // RGB values for #007FFF (your primary color)
                    gradientWidth={100} // Width of the gradient fade effect in pixels
                >
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="mx-4 flex-shrink-0 w-80 md:w-96 lg:w-[450px]" // Set a fixed width for each card in the marquee
                        >
                            <LatestReviewCard
                                reviewerName={review.reviewerName}
                                reviewerImage={review.reviewerImage}
                                reviewDescription={review.reviewDescription}
                                propertyTitle={review.propertyTitle}
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default LatestReviews;