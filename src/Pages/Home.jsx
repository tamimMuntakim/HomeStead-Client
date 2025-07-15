import React from 'react';
import Banner from '../Components/Banner';
import AdvProperties from '../Components/AdvProperties';
import LatestReviews from '../Components/LatestReveiws';
import Faq from '../Components/Faq';

const Home = () => {
    return (
        <>
            <section id="banner" className='w-11/12 md:container mx-auto rounded-md overflow-hidden shadow-xl'>
                <Banner></Banner>
            </section>
            <section id="adv-properties" className='w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl'>
                <AdvProperties></AdvProperties>
            </section>
            <section id="user-reviews" className='w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl'>
                <LatestReviews></LatestReviews>
            </section>
            <section id="faq" className='w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-xl'>
                <Faq></Faq>
            </section>
        </>
    );
};

export default Home;