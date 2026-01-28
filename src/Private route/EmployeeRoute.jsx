import React, { useContext } from 'react';
import { AuthContext } from '../Context/Context';

const EmployeeRoute = ({ children }) => {
    const { user, loading, roleUser } = useContext(AuthContext);
    

    if (loading) return <span className="loading loading-spinner loading-xl"></span>

    if (!user || roleUser !== 'Employee') {
        return <Navigate to='/' replace></Navigate>
    }
    return (
       <>{children}</>
    );
};

export default EmployeeRoute;