import React from 'react';
import Banner from '../Components/Banner';

const Home = () => {
    return (
        <>
        <section id="banner" className='w-11/12 md:container mx-auto rounded-md overflow-hidden'>
            <Banner></Banner>
        </section>
        </>
    );
};

export default Home;