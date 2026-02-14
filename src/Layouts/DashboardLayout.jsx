import React, { useContext } from 'react';
import { FaFileSignature, FaList } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoBagAdd } from 'react-icons/io5';
import { MdOutlineProductionQuantityLimits, MdWebAsset } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../Context/Context';

const DashboardLayout = () => {
    const { userData } = useContext(AuthContext);


    return (
        <div className="drawer  lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="py-3 w-full rounded-bl-4xl mt-1 rounded-tr-4xl rounded-br-xl rounded-tl-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
                    <div className="px-4">Navbar Title</div>
                </nav>
                {/* Page content here */}

                <Outlet className="p-4">Page Content</Outlet>

            </div>

            <div className='min-w-[220px]'>
                <div className='bg-gradient-to-br from-cyan-400 to-blue-500 text-white mr-1 mt-1 mb-2 rounded-bl-4xl rounded-tr-4xl rounded-br-xl rounded-tl-xl py-3'>
                    <NavLink className='flex gap-2 items-center ' to={userData?.role === "HR" ? '/dash/HR-profile' : '/dash/employee-profile'}>
                        <div className='ml-4'>
                            <img className='w-6 h-6 rounded-full' src={userData.userImage} alt="User Image" />
                        </div>
                        <p className='text-xs'>
                            {userData.name}
                        </p></NavLink>
                </div>
                <div className="flex min-h-full flex-col rounded-t-2xl  items-start bg-gradient-to-br from-cyan-400 to-blue-500 text-white is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu p-0 pl-2 text-gray-100 w-full grow ">
                        {/* List item */}
                        <li>
                            <NavLink to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </NavLink>
                        </li>

                        {/* List item */}

                        <div className='nav space-y-3 text-s '>
                            {
                                userData?.role === 'HR' && <>
                                    <li>
                                        <NavLink to='/dash/asset-list'>
                                            <MdWebAsset />
                                            <span className="is-drawer-close:hidden" >Asset List</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dash/add-asset' >
                                            <IoBagAdd />
                                            <span className="is-drawer-close:hidden">Add Asset</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dash/all-request'>
                                            <FaFileSignature />
                                            <span className="is-drawer-close:hidden">Asset Requests</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dash/employee-requests'>
                                            <FaList />
                                            <span className="is-drawer-close:hidden">Employee Requests</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dash/my-employee'>
                                            <RiTeamFill />

                                            <span className="is-drawer-close:hidden">Employee List</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dash/HR-package'>
                                            <FaList />
                                            <span className="is-drawer-close:hidden">Upgrade Package</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dash/HR-profile'>
                                            <ImProfile />
                                            <span className="is-drawer-close:hidden">My Profile</span>
                                        </NavLink>
                                    </li>
                                </>
                            }

                            {
                                userData?.role === 'Employee' && <>

                                    <li>
                                        <NavLink to='/dash/employee-asset'>
                                            <MdOutlineProductionQuantityLimits />
                                            <span className="is-drawer-close:hidden">My Assets</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dash/request-asset'>
                                            <FaFileSignature />
                                            <span className="is-drawer-close:hidden">Request an Asset</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dash/employee-join'>
                                            <FaFileSignature />
                                            <span className="is-drawer-close:hidden">Join as Employee</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dash/employee-profile'>
                                            <ImProfile />
                                            <span className="is-drawer-close:hidden">My Profile</span>
                                        </NavLink>
                                    </li>

                                </>
                            }


                        </div>



                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;