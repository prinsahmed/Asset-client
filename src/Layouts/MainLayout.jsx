import React from 'react';
import NavBar from '../Components/Navigation/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Components/Homepage/Footer';

const MainLayout = () => {
    return (
        <div className='bg-[#F7F6F2] bg-gradient-to-br from-[#7378fe20] to-[#f8acff5c]'>
            <NavBar />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default MainLayout;