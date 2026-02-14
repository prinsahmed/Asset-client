import React from 'react';
import Extras from '../../Components/Homepage/Extras';
import Banner from '../../Components/Homepage/Banner';
import About from '../../Components/Homepage/About';
import Statistics from '../../Components/Homepage/Statistics';
import Feature from '../../Components/Homepage/Feature';
import PricingCard from '../../Components/Homepage/PricingCard';





const HomePage = () => {
    return (
        <>
            <Banner />
            <main className='max-w-10/12 mx-auto'>
                <PricingCard />
                <About />
                <Feature />
                <Statistics />
                <Extras />
            </main>
        </>
    );
};

export default HomePage;