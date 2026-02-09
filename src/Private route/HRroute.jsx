import React, { useContext } from 'react';
import { AuthContext } from '../Context/Context';
import { Navigate } from 'react-router';

const HRroute = ({ children }) => {
    const { userData, user } = useContext(AuthContext)

 console.log(userData.role);

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