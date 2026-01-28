import React, { Children, useContext } from 'react';
import { AuthContext } from '../Context/Context';
import { Navigate } from 'react-router';

const LoginRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);


    if (loading) return <span className="loading loading-spinner loading-xl"></span>

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