import React from 'react';
import Banner from '../Components/Banner';
import AdvProperties from '../Components/AdvProperties';

const Home = () => {
    return (
        <>
        <section id="banner" className='w-11/12 md:container mx-auto rounded-md overflow-hidden shadow-2xl'>
            <Banner></Banner>
        </section>
        <section id="adv-properties" className='w-11/12 md:container mx-auto rounded-md overflow-hidden mt-8 md:mt-16 shadow-2xl'>
            <AdvProperties></AdvProperties>
        </section>
        </>
    );
};

export default Home;