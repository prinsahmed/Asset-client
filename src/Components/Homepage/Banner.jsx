import React from 'react';
import bgImage from '../../assets/bg-banner.jpg'
import CardAnimation from '../Animations/CardAnimation';





const Banner = () => {
    return (
        <CardAnimation
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
            className="relative h-dvh">
            <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0  bg-black/50 pt-36 pl-32">
                <h1 className="text-white font-bold text-7xl">Strategic Solutions for <br /> Your <span className='text-[#7980e4] animate-pulse'>Assets</span> </h1>
                <h2 className='text-white font-light text-lg mt-5'>Effortless asset management designed to maximize <br />your returns and simplify your workflow.</h2>
            </div>
        </CardAnimation>
    );
};

export default Banner;