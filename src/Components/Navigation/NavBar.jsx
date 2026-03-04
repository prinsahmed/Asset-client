import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";
import Button from "../Button/Button";
import NavDropdown from "./NavDropdown";

const NavBar = () => {
  const { user, signOutCurrentUser } = useContext(AuthContext);

  function handleSignOut() {
    signOutCurrentUser().then(() => {
      Swal.fire({
        icon: "success",
        title: "Successfully logged out",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  return (
    <div className="flex fixed z-50 w-full bg-linear-to-br px-2   from-cyan-400 to-blue-500 text-white  shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown">
      
          <NavDropdown/>
        </div>

        <NavLink to="/" className="btn btn-ghost  text-white text-xl p-0">Asset<span className="text-black -ml-1.5">Verse</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu nav2 menu-horizontal bg-gray-400/30 p-0 shadow-lg  backdrop-blur-lg rounded-full text-white ">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink to="/auth/employee-registration">
                  Join as Employee
                </NavLink>
              </li>
              <li>
                <NavLink to="/auth/HR-registration">Join as HR</NavLink>
              </li>
            </>
          )}
          {user && (
            <li>
              <NavLink to="/dash">Dashboard</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button className='btn btn-neutral my-1 hover:scale-105 transition-all duration-300' onClick={handleSignOut}>
            Log out
          </button>
        ) : (
          <Link
            to="/auth/login"
            className="btn btn-neutral my-1 hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
