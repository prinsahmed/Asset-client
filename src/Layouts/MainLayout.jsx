import React from "react";
import NavBar from "../Components/Navigation/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Homepage/Footer";

const MainLayout = () => {
  return (
    <>
      <div>
        <NavBar />
        <Outlet />
      </div>
      <footer className="bg-base-200">
        <Footer />
      </footer>
      
    </>
  );
};

export default MainLayout;
