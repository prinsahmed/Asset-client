import React from 'react';
import Banner from '../Components/Homepage/Banner';
import About from '../Components/Homepage/About';
import Feature from '../Components/Homepage/Feature';
import Statistics from '../Components/Homepage/Statistics';
import Extras from '../Components/Homepage/Extras';





const HomePage = () => {
    return (
        <>
            <Banner />
            <main className='max-w-10/12 mx-auto'>
                <About />
                <Feature/>
                <Statistics/>
                <Extras/>
            </main>
        </>
    );
};

export default HomePage;