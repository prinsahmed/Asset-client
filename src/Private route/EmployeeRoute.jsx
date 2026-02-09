import React, { useContext } from 'react';
import { AuthContext } from '../Context/Context';

const EmployeeRoute = ({ children }) => {
    const { user, userData } = useContext(AuthContext);
    



    if (!user || userData?.role !== 'Employee') {
        return <Navigate to='/' replace></Navigate>
    }
    return (
       <>{children}</>
    );
};

export default EmployeeRoute;