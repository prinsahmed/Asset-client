import React, { useContext } from 'react';
import { AuthContext } from '../Context/Context';
import { Navigate } from 'react-router';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/Gears Lottie Animation.json'


const HRroute = ({ children }) => {
    const { userData, user, loading } = useContext(AuthContext)

    if (loading) return <div className=' h-dvh flex justify-center items-center '>
        <Lottie style={{ width: 400, height: 400 }} animationData={loadingAnimation} loop={true} />
    </div>

    if (!user || userData?.role !== 'HR') {
        return <Navigate to='/' replace></Navigate>
    }



    return (
        <>
            {children}
        </>
    );
};

export default HRroute;