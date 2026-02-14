import React, { useContext } from 'react';
import { AuthContext } from '../Context/Context';
import loadingAnimation from '../assets/Gears Lottie Animation.json'
import Lottie from 'lottie-react';


const EmployeeRoute = ({ children }) => {
    const { user, userData, loading } = useContext(AuthContext);


    if (loading) return <div className=' h-dvh flex justify-center items-center '>
        <Lottie style={{ width: 400, height: 400 }} animationData={loadingAnimation} loop={true} />
    </div>

    if (!user || userData?.role !== 'Employee') {
        return <Navigate to='/' replace></Navigate>
    }
    return (
        <>{children}</>
    );
};

export default EmployeeRoute;