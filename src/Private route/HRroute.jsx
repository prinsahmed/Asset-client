import React, { useContext } from 'react';
import { AuthContext } from '../Context/Context';
import { Navigate } from 'react-router';

const HRroute = ({ children }) => {
    const { roleUser, user, loading } = useContext(AuthContext)

    if (loading) return <span className="loading loading-spinner loading-xl"></span>

    if (!user || roleUser !== 'HR') {
        return <Navigate to='/' replace></Navigate>
    }



    return (
        <>
            {children}
        </>
    );
};

export default HRroute;