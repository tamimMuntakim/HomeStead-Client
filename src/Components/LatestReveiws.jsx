import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaHouseUser } from "react-icons/fa";
import LatestReviewCard from './LatestReviewCard';
import useLatestReviews from '../Hooks/useLatestReviews';


const LatestReviews = () => {

    const { data: reviews = [], isLoading } = useLatestReviews();

    if (isLoading) {
        return <div className="text-center text-white py-10 font-semibold">Loading latest reviews...</div>;
    }

    return (
        <section
            className="py-10 text-white"
            style={{ backgroundColor: 'var(--color-primary, #007FFF)' }}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-3 flex items-center justify-center">
                    What Our Users Say <FaHouseUser className='hidden md:inline ml-1 md:ml-2' />
                </h2>
                <p className="text-sm md:text-base text-center text-slate-200 mb-8 md:mb-12 max-w-2xl mx-auto">
                    Hear from our satisfied clients about their HomeStead experience.
                </p>

                <Marquee
                    speed={40}
                    pauseOnHover={true}
                    gradient={true}
                    gradientColor={[0, 127, 255]}
                    gradientWidth={100}
                >
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="mx-4 flex-shrink-0 w-80 md:w-96 lg:w-[450px]"
                        >
                            <LatestReviewCard
                                review={review}
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default LatestReviews;
