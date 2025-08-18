import React from 'react';
import Banner from '../Components/Banner';
import AdvProperties from '../Components/AdvProperties';
import LatestReviews from '../Components/LatestReveiws';
import Faq from '../Components/Faq';
import WhyChooseUs from '../Components/WhyChooseUs';
import FeaturedAgents from '../Components/FeaturedAgent';
import AvailableLocations from '../Components/AvailableLocations';
import HowItWorks from '../Components/HowItWorks';

const Home = () => {
    return (
        <>
            <section id="banner" className='w-11/12 md:container mx-auto rounded-md overflow-hidden shadow-xl'>
                <Banner></Banner>
            </section>
            <section id="adv-properties" className='w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl'>
                <AdvProperties></AdvProperties>
            </section>
            <section id="why-choose-us" className='w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl'>
                <WhyChooseUs></WhyChooseUs>
            </section>
            <section id="how-it-works" className='w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl'>
                <HowItWorks></HowItWorks>
            </section>
            <section id="user-reviews" className='w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl'>
                <LatestReviews></LatestReviews>
            </section>
            <section id="featured-agents" className="w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl">
                <FeaturedAgents></FeaturedAgents>
            </section>
            <section id="available-locations" className="w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl">
                <AvailableLocations></AvailableLocations>
            </section>
            <section id="faq" className='w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl'>
                <Faq></Faq>
            </section>
        </>
    );
};

export default Home;