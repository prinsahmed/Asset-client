import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/Context";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../Hooks/Api/useAxios";
import Swal from "sweetalert2";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Gears Lottie Animation.json";
import { UserMinus, Users, Calendar, ShieldCheck, Mail } from "lucide-react";

const EmployeeList = () => {
  const { user } = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const axiosSecure = useAxios();

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["HRId", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-list?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRemove = (id) => {
    axiosSecure.delete(`/employee-delete/${id}`).then((res) => {
      if (res.data.deletedCount === 1) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Deleted",
          showConfirmButton: false,
          timer: 1000,
        });
        setIsConfirming(false);
        refetch();
      }
    });
  };

  if (isLoading)
    return (
      <div className="h-dvh flex justify-center items-center">
        <Lottie
          style={{ width: 400, height: 400 }}
          animationData={loadingAnimation}
          loop={true}
        />
      </div>
    );



  return (
    <>
    <title>Employee-List | AssetVerse</title>
    <CardAnimation
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen p-4 lg:p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header & Capacity Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="text-indigo-600" />
              Team Members
            </h2>
            <p className="text-sm text-gray-500">
              Manage your active company employees
            </p>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* 1. DESKTOP TABLE VIEW */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                <tr>
                  <th className="py-4">Employee</th>
                  <th>Join Date</th>
                  <th className="text-center">Active Assets</th>
                  <th className="text-right px-10">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {assets.map((ele) => (
                  <tr
                    key={ele._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={ele.employeeImage}
                          className="w-11 h-11 rounded-full ring-2 ring-gray-50"
                          alt={ele.employeeName}
                        />
                        <div>
                          <p className="font-bold text-gray-700">
                            {ele.employeeName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {ele.employeeEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-500 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(ele.approvalDate).toLocaleDateString() ||
                          "N/A"}
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-sm bg-indigo-50 border-none text-indigo-600 font-bold px-3">
                        5 Assets
                      </span>
                    </td>
                    <td className="text-right px-6">
                      <button
                        onClick={() => {
                          setSelectedId(ele._id);
                          setIsConfirming(true);
                        }}
                        className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <UserMinus size={18} />
                        <span className="hidden lg:inline">Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. MOBILE CARD VIEW */}
          <div className="md:hidden divide-y divide-gray-100">
            {assets.map((ele) => (
              <div key={ele._id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img
                      src={ele.employeeImage}
                      className="w-12 h-12 rounded-full border"
                      alt=""
                    />
                    <div>
                      <h3 className="font-bold text-gray-800 leading-tight">
                        {ele.employeeName}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Mail size={12} /> {ele.employeeEmail}
                      </p>
                    </div>
                  </div>
                  
                </div>

                <div className="flex items-center justify-between text-xs bg-gray-50 p-3 rounded-xl">
                  <span className="text-gray-400 uppercase font-bold tracking-tighter">
                    Joined On
                  </span>
                  <span className="text-gray-700 font-medium">
                    {new Date(ele.approvalDate).toLocaleDateString()}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedId(ele._id);
                    setIsConfirming(true);
                  }}
                  className="btn btn-sm w-full bg-red-50 text-red-600 border-none hover:bg-red-100"
                >
                  <UserMinus size={14} /> Remove from Team
                </button>
              </div>
            ))}
          </div>
        </div>

        
        {isConfirming && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <UserMinus size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Remove Employee?
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                This will revoke their access to all company assets. This action
                cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsConfirming(false)}
                  className="btn flex-1 bg-gray-100 border-none hover:bg-gray-200 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRemove(selectedId)}
                  className="btn flex-1 bg-red-600 hover:bg-red-700 border-none text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CardAnimation>
    </>
  );
};

export default EmployeeList;
