import React, { useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { Navigate } from 'react-router';

const DashBoardIndex = () => {
    const { userData, loading } = useContext(AuthContext)

    if (loading) return 

    if (userData?.role === 'HR') {
        return <Navigate to="asset-list" replace />;
    }

    if (userData?.role === 'Employee') {
        return <Navigate to="employee-asset" replace />;
    }


    return <Navigate to="/" replace />;
};

export default DashBoardIndex;