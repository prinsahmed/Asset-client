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
            <main>
               <div className='w-11/12 mx-auto'> 
                <PricingCard />
                <About />
                <Feature />
                <Extras />
                <Statistics />

                </div>
            </main>
        </>
    );
};

export default HomePage;