import React, { useContext } from 'react';
import { FaFileSignature, FaList } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoBagAdd } from 'react-icons/io5';
import { MdOutlineProductionQuantityLimits, MdWebAsset } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../Context/Context';

const DashboardLayout = () => {
    const { roleUser, loading } = useContext(AuthContext);

    if(loading) return <span className="loading loading-spinner loading-xl"></span>

    return (
        <div className="drawer bg-[#F5F8FF] lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full rounded-l-full bg-[#5D7BFF]">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">Navbar Title</div>
                </nav>
                {/* Page content here */}

                <Outlet className="p-4">Page Content</Outlet>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col rounded-tr-[60px] items-start bg-[#5D7BFF] is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu text-white w-full grow">
                        {/* List item */}
                        <li>
                            <NavLink to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </NavLink>
                        </li>

                        {/* List item */}

                        <div className='nav space-y-3 text-base'>
                            {
                                roleUser === 'HR' && <>
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
                                        <NavLink>
                                             <FaList />
                                            <span className="is-drawer-close:hidden">Upgrade Package</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink>
                                            <ImProfile />
                                            <span className="is-drawer-close:hidden">My Profile</span>
                                        </NavLink>
                                    </li>
                                </>
                            }

                            {
                                roleUser === 'Employee' && <>

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
                                        <NavLink to='/dash/my-team'>
                                            <FaList />
                                            <span className="is-drawer-close:hidden">My Team</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink>
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