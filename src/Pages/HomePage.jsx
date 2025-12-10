import React from 'react';
import Banner from '../Components/Homepage/Banner';
import About from '../Components/Homepage/About';
import Feature from '../Components/Homepage/Feature';





const HomePage = () => {
    return (
        <>
            <Banner />
            <main className='max-w-10/12 mx-auto'>
                <About />
                <Feature/>
            </main>
        </>
    );
};

export default HomePage;