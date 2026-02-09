import React from 'react';
import { Home, BarChart2, Users, Settings } from "lucide-react";
import { motion } from "framer-motion";


const PackageHR = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                
                className="relative w-full max-w-6xl"
            >
                {/* Isometric Container */}
                <div className="transform-gpu [transform:rotateX(55deg)_rotateZ(45deg)] origin-center">
                    <div className="grid grid-cols-12 gap-6">


                        {/* Sidebar */}
                        <div className="col-span-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-2xl p-6 space-y-6">
                            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
                            <nav className="space-y-4 text-indigo-100">
                                <div className="flex items-center gap-3 font-medium hover:text-white cursor-pointer">
                                    <Home size={18} /> Overview
                                </div>
                                <div className="flex items-center gap-3 font-medium hover:text-white cursor-pointer">
                                    <BarChart2 size={18} /> Analytics
                                </div>
                                <div className="flex items-center gap-3 font-medium hover:text-white cursor-pointer">
                                    <Users size={18} /> Team
                                </div>
                                <div className="flex items-center gap-3 font-medium hover:text-white cursor-pointer">
                                    <Settings size={18} /> Settings
                                </div>
                            </nav>
                        </div>


                        {/* Main Content */}
                        <div className="col-span-9 grid grid-cols-3 gap-6">
                            {/* Stat Cards */}
                            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-2xl shadow-xl p-6">
                                <p className="text-sm text-slate-500">Revenue</p>
                                <p className="text-2xl font-semibold mt-2">$24,300</p>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-2xl shadow-xl p-6">
                                <p className="text-sm text-slate-500">Users</p>
                                <p className="text-2xl font-semibold mt-2">1,284</p>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-2xl shadow-xl p-6">
                                <p className="text-sm text-slate-500">Growth</p>
                                <p className="text-2xl font-semibold mt-2">+12.4%</p>
                            </div>


                            {/* Activity Card */}
                            <div className="col-span-3 bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white rounded-2xl shadow-2xl p-6">
                                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                                <div className="space-y-3">
                                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur text-sm text-indigo-100 shadow-sm">
                                        New user signed up
                                    </div>
                                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur text-sm text-indigo-100 shadow-sm">
                                        Monthly report generated
                                    </div>
                                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur text-sm text-indigo-100 shadow-sm">
                                        Server backup completed
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );

};

export default PackageHR;