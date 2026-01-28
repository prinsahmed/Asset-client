import React, { useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { Navigate } from 'react-router';

const DashBoardIndex = () => {
    const { user, roleUser, loading } = useContext(AuthContext)

    if (loading) return 

    if (roleUser === 'HR') {
        return <Navigate to="asset-list" replace />;
    }

    if (roleUser === 'Employee') {
        return <Navigate to="employee-asset" replace />;
    }


    return <Navigate to="/" replace />;
};

export default DashBoardIndex;