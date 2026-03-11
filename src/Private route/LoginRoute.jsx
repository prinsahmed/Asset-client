import React, { Children, useContext } from 'react';
import { AuthContext } from '../Context/Context';
import { Navigate } from 'react-router';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/Gears Lottie Animation.json'



const LoginRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);


    if (loading) return <div className='h-dvh flex justify-center items-center '>
        <Lottie style={{ width: 400, height: 400 }} animationData={loadingAnimation} loop={true} />
    </div>

    if (!user) {
        return <Navigate to='/auth/login' replace></Navigate>
    }

    return (
        <>
            {children}
        </>
    );
};

export default LoginRoute;