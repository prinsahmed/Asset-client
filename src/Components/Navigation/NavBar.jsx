import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';

const NavBar = () => {

    const { user, signOutCurrentUser } = useContext(AuthContext);

    function handleSignOut() {
        signOutCurrentUser()
            .then(() => {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully logged out",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
    }

    return (
        <div className="navbar bg-[#5D7BFF]  shadow-sm ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu nav2 menu-sm text-white  dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><NavLink to='/'>Home</NavLink></li>
                        {
                            !user && <><li><NavLink to='/auth/employee-registration'>Join as Employee</NavLink></li>
                                <li><NavLink to='/auth/HR-registration'>Join as HR</NavLink></li></>
                        }
                        {user && <li><NavLink to='/dash'>Dashboard</NavLink></li>}
                    </ul>
                </div>

                <NavLink to='/' className="btn btn-ghost text-white text-xl p-0">AssetVerse</NavLink>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu nav2 menu-horizontal text-white px-1">
                    <li><NavLink to='/'>Home</NavLink></li>
                    {
                        !user && <><li><NavLink to='/auth/employee-registration'>Join as Employee</NavLink></li>
                            <li><NavLink to='/auth/HR-registration'>Join as HR</NavLink></li></>
                    }
                    {user && <li><NavLink to='/dash'>Dashboard</NavLink></li>}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button onClick={handleSignOut} className='button-style'>Logout</button> :
                        <Link to='/auth/login' className='button-style'>Login</Link>
                }
            </div>
        </div>
    );
};

export default NavBar;