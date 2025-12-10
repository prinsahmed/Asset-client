import React from 'react';
import trackImg from '../../assets/tracking.png'
import increaseImg from '../../assets/increase.png'
import scalableImg from '../../assets/scalable.png'
import coachImg from '../../assets/coaching.png'

const About = () => {
    return (
        <div>
            <h2 className='text-center text-4xl font-semibold mt-20 mb-10'>About Us</h2>
            <div className='flex justify-center  gap-x-5 '>
                <div className="space-y-4">

                    <div className="bg-white shadow-[0px_8px_24px_rgba(149,157,165,0.2)] rounded-xl p-6 ml-0">
                        <div className='flex items-center gap-x-1'>
                            <img className='w-12' src={trackImg} alt="tracking asset" />
                            <h3 className="font-semibold text-lg">Centralized Asset Tracking</h3>
                        </div>
                        <p className='text-[15px] text-gray-600'>Keep all company assets—devices, documents, equipment, and resources—in one organized dashboard for complete visibility and control.</p>
                    </div>

                    <div className="bg-white shadow-[0px_8px_24px_rgba(149,157,165,0.2)] rounded-xl p-6 ml-5">
                        <div className='flex items-center gap-x-2'>
                            <img className='w-10' src={coachImg} alt="smart management" />
                            <h3 className="font-semibold text-lg">Smart Employee & HR Management</h3>
                        </div>
                        <p className='text-[15px] text-gray-600'>Streamline employee onboarding, record-keeping, and role assignments with automated workflows designed for HR teams.</p>
                    </div>

                    <div className="bg-white shadow-[0px_8px_24px_rgba(149,157,165,0.2)] rounded-xl p-6 ml-10">
                        <div className='flex items-center gap-x-2'>
                            <img className='w-10' src={increaseImg} alt="productivity" />
                            <h3 className="font-semibold text-lg">Improve Productivity & Reduce Manual Work</h3>
                        </div>
                        <p className='text-[15px] text-gray-600'>Automated updates, reminders, reports, and asset lifecycle tracking eliminate manual errors and save hours of administration time.</p>
                    </div>

                    <div className="bg-white shadow-[0px_8px_24px_rgba(149,157,165,0.2)] rounded-xl p-6 ml-14">
                        <div className='flex items-center gap-x-2'>
                            <img className='w-10' src={scalableImg} alt="scalable" />
                            <h3 className="font-semibold text-lg">Scalable for Growing Companies</h3>
                        </div>
                        <p className='text-[15px] text-gray-600'>Whether you manage 5 employees or 500, AssetVerse adapts easily as your business expands.</p>
                    </div>

                </div>
                <div className='shadow-[0px_8px_24px_rgba(149,157,165,0.2)] p-6'>
                    <ul>
                        <h2 className='text-lg font-semibold'>Clean & Professional</h2>
                        <li className='text-sm text-gray-400 '>At AssetVerse, we empower organizations with smarter tools to manage their assets, employees, and operations — all from a single, secure platform.</li>
                        <div className='h-[0.5px] mt-2 bg-gray-300'></div>

                        <h2 className='text-lg font-semibold mt-8'>Corporate Tone</h2>
                        <li className='text-sm text-gray-400 '>Designed for modern businesses, AssetVerse simplifies asset oversight, strengthens operational control, and supports HR teams with reliable automation.</li>
                        <div className='h-[0.5px] mt-2 bg-gray-300'></div>

                        <h2 className='text-lg font-semibold mt-8'>Premium & Trust-Focused</h2>
                        <li className='text-sm text-gray-400 '>We help companies reduce operational risk, enhance transparency, and make data-driven decisions with a centralized management system built for efficiency.</li>
                        <div className='h-[0.5px] mt-2 bg-gray-300'></div>

                        <h2 className='text-lg font-semibold mt-8'>Tech-Forward & Corporate</h2>
                        <li className='text-sm text-gray-400'>With advanced tracking, intelligent automation, and secure cloud infrastructure, AssetVerse enables organizations to operate smarter and scale confidently.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;