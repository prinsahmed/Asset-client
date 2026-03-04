import React, { useContext, useState } from "react";
import { useAxios } from "../../../Hooks/Api/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/Context";
import Swal from "sweetalert2";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Lottie from "lottie-react";
import { useDebounce } from "use-debounce";
import loadingAnimation from "../../../assets/Gears Lottie Animation.json";
import {
  Search,
  Filter,
  RotateCcw,
  Package,
  Calendar,
  Building2,
} from "lucide-react";
import StatusBadge from "../../../Components/Status/StatusBadge";

const EmployeeAssets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 1000);
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);
  const [filterType, setFilterType] = useState("All Types");

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["emplyeeEmail", debouncedSearch, filterType, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employee-assets?email=${user?.email}&search=${debouncedSearch}&filter=${filterType}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleReturn = (id) => {
    Swal.fire({
      title: "Return Asset?",
      text: "Are you sure you want to return this item to the company?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/employee-assets-return/${id}`, { requestStatus: "returned" })
          .then((res) => {
            if (res.data.modifiedCount === 1) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Returned",
                showConfirmButton: false,
                timer: 1000,
              });
              refetch();
            }
          });
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
    <title>My-Assets | AssetVerse</title>
    <CardAnimation
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto min-h-screen p-4 lg:p-6 rounded-3xl shadow-xl"
    >
      {/* --- HEADER SECTION --- */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package className="text-blue-600" />
          My Assigned Assets
        </h2>
        <p className="text-sm text-gray-500">
          Track and manage items issued to you by the company
        </p>
      </div>

      {/* --- SEARCH & FILTER BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by asset name..."
            className="input input-bordered w-full pl-10 focus:border-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select
            className="select select-bordered w-full md:w-48 pl-10"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option>All Types</option>
            <option>Returnable</option>
            <option>Non-returnable</option>
          </select>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 1. DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="py-4">Asset</th>
                <th>Type</th>
                <th>Company</th>
                <th>Dates</th>
                <th>Status</th>
                <th className="text-right px-6">Action</th>
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
                        src={ele.productImage}
                        className="h-12 w-12 rounded-xl object-cover ring-1 ring-gray-100"
                        alt={ele.productName}
                      />
                      <span className="font-bold text-gray-700">
                        {ele.productName}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm font-bold ${ele.productType === "Returnable" ? "bg-green-50 text-green-700 border-green-100" : "bg-gray-50 text-gray-600"}`}
                    >
                      {ele.productType}
                    </span>
                  </td>
                  <td className="text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                      <Building2 size={14} />
                      {ele.companyName}
                    </div>
                  </td>
                  <td className="text-xs space-y-1">
                    <p className="text-gray-400">
                      Req: {new Date(ele.requestDate).toLocaleDateString()}
                    </p>
                    <p className="text-blue-600 font-medium">
                      App: {new Date(ele.approvalDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td>
                    <StatusBadge status={ele.requestStatus}></StatusBadge>
                  </td>
                  <td className="text-right px-6">
                    {ele.productType === "Returnable" &&
                    ele.requestStatus === "approved" ? (
                      <button
                        onClick={() => handleReturn(ele._id)}
                        className="btn btn-sm btn-error btn-outline"
                      >
                        <RotateCcw size={14} /> Return
                      </button>
                    ) : (
                      <span className="text-xs text-gray-300 italic">
                        No Action
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. MOBILE CARD VIEW */}
        <div className="md:hidden divide-y divide-gray-100">
          {assets.length > 0 ? (
            assets.map((ele) => (
              <div key={ele._id} className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={ele.productImage}
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                    alt=""
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">
                      {ele.productName}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Building2 size={12} /> {ele.companyName}
                    </p>
                  </div>
                  <span className="badge bg-[#1C4D8D] text-white text-[10px] font-bold uppercase">
                    {ele.requestStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-gray-50 rounded-xl p-3 text-xs">
                  <div>
                    <p className="text-gray-400 font-bold uppercase tracking-tighter">
                      Type
                    </p>
                    <p className="font-medium text-gray-700">
                      {ele.productType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-bold uppercase tracking-tighter">
                      Approved
                    </p>
                    <p className="font-medium text-gray-700">
                      {new Date(ele.approvalDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {ele.productType === "Returnable" &&
                  ele.requestStatus === "approved" && (
                    <button
                      onClick={() => handleReturn(ele._id)}
                      className="btn btn-sm w-full bg-red-50 text-red-600 border-none hover:bg-red-100"
                    >
                      <RotateCcw size={14} /> Return to Company
                    </button>
                  )}
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-400 italic">
              No assets matching your search.
            </div>
          )}
        </div>
      </div>
    </CardAnimation>
    </>
  );
};

export default EmployeeAssets;
