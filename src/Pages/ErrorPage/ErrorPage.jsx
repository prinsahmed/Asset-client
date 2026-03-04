import React from 'react';
import Err404 from '../../assets/404 error.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router';
import { HomeIcon } from 'lucide-react';



const ErrorPage = () => {
    return (
       <>
       <title>Error | AssetVerse</title>
        <div className='flex justify-center items-center'>
            <div className='relative' >
                <Lottie style={{ width: 700, height: 600 }} animationData={Err404} loop={true} />
                <span className='absolute left-80 top-120 btn btn-neutral hover:scale-105 transition-all duration-400'><HomeIcon size={17} /><Link to='/'>Go Home</Link></span>
            </div>
        </div>
       </>
    );
};

export default ErrorPage;