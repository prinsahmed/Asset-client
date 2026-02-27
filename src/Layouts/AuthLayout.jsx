import React from "react";
import NavBar from "../Components/Navigation/NavBar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-gradient-to-br from-[#7378fe20] to-[#f8acff5c]">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
