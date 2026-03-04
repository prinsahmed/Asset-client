import React, { useContext, useState } from "react";
import { FaFileSignature, FaList } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoBagAdd } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { Outlet } from "react-router";
import { AuthContext } from "../Context/Context";
import {
  CircleFadingArrowUp,
  FileUser,
  Home,
  Menu,
  Package,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  UserPen,
  UserPlus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLink from "../Components/Navigation/SideBarLink";

const DashboardLayout = () => {
  const { userData, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1024);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* 1. ANIMATED OVERLAY (Mobile Only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* 2. SIDEBAR */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed lg:static inset-y-0 left-0 z-50 w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col shadow-2xl lg:shadow-none"
          >
            {/* Sidebar Profile Section */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full ring-2 ring-sky-500"
                  src={user?.photoURL}
                  alt="Profile"
                />
                <div>
                  <p className="font-bold text-gray-800 text-sm truncate w-32">
                    {userData?.name}
                  </p>
                  <p className="text-[10px] text-sky-500 font-bold uppercase tracking-widest">
                    {userData?.role}
                  </p>
                </div>
              </div>
              {/* Close button for mobile inside sidebar */}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-200 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="menu p-4 gap-2 text-gray-600 font-medium overflow-y-auto w-full grow">
              <SidebarLink
                to="/"
                icon={<Home size={20} />}
                label="Homepage"
                setIsOpen={setIsOpen}
              />

              <div className="mt-6 mb-2 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Main Menu
              </div>

              {userData?.role === "HR" && (
                <>
                  <SidebarLink
                    to="/dash/asset-list"
                    icon={<PackageOpen />}
                    label="Asset List"
                    setIsOpen={setIsOpen}
                  />
                  <SidebarLink
                    to="/dash/add-asset"
                    icon={<PackagePlus />}
                    label="Add Asset"
                    setIsOpen={setIsOpen}
                  />
                  <SidebarLink
                    to="/dash/all-request"
                    icon={<PackageSearch />}
                    label="Asset Requests"
                    setIsOpen={setIsOpen}
                  />
                  <SidebarLink
                    to="/dash/employee-requests"
                    icon={<FileUser />}
                    label="Employee Requests"
                    setIsOpen={setIsOpen}
                  />
                  <SidebarLink
                    to="/dash/my-employee"
                    icon={<RiTeamFill />}
                    label="Employee List"
                    setIsOpen={setIsOpen}
                  />
                  <SidebarLink
                    to="/dash/HR-package"
                    icon={<CircleFadingArrowUp />}
                    label="Upgrade Package"
                    setIsOpen={setIsOpen}
                  />
                  <SidebarLink
                    to="/dash/HR-profile"
                    icon={<UserPen />}
                    label="My Profile"
                    setIsOpen={setIsOpen}
                  />
                </>
              )}

              {userData?.role === "Employee" && (
                <>
                  <SidebarLink
                    to="/dash/employee-asset"
                    icon={<Package />}
                    label="My Assets"
                    setIsOpen={setIsOpen}
                  />
                  <SidebarLink
                    to="/dash/request-asset"
                    icon={<PackagePlus />}
                    label="Request Asset"
                    setIsOpen={setIsOpen}
                  />
                  <SidebarLink
                    to="/dash/employee-join"
                    icon={<UserPlus />}
                    label="Join Team"
                    setIsOpen={setIsOpen}
                  />
                  <SidebarLink
                    to="/dash/employee-profile"
                    icon={<UserPen />}
                    label="My Profile"
                    setIsOpen={setIsOpen}
                  />
                </>
              )}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <nav className="h-16 flex items-center justify-between px-2 bg-white border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-800">
                {userData?.name}
              </p>
              <p className="text-[10px] text-gray-500">{userData?.email}</p>
            </div>
            <img
              className="w-9 h-9 rounded-full ring-1 ring-gray-200"
              src={userData?.userImage}
              alt=""
            />
          </div>
        </nav>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
