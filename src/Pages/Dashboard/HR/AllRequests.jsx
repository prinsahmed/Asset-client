import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useAxios } from "../../../Hooks/Api/useAxios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/Context";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Gears Lottie Animation.json";
import { CheckCircle, XCircle, Clock, User, HardDrive } from "lucide-react";
import StatusBadge from "../../../Components/Status/StatusBadge";

const AllRequests = () => {
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userEmail", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-requests?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleApproved = (id, productId) => {
    const update = { requestStatus: "approved", productId: productId };
    axiosSecure
      .put(`/asset-approval/${id}`, update)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Approved",
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleReject = (id) => {
    const requestStatus = { requestStatus: "rejected" };
    axiosSecure
      .put(`/asset-reject/${id}`, requestStatus)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Rejected",
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        }
      })
      .catch((err) => console.log(err.message));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Lottie
          style={{ width: 400, height: 400 }}
          animationData={loadingAnimation}
          loop={true}
        />
      </div>
    );
  }

  return (
    <CardAnimation
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 lg:p-6 min-h-screen"
    >
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <HardDrive className="text-blue-600" />
            Asset Requests
          </h2>
          <p className="text-sm text-gray-500">
            Review and manage employee asset applications
          </p>
        </div>
        <div className="badge badge-lg bg-blue-50 text-blue-700 border-blue-100 font-bold p-4">
          Total: {assets.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 1. DESKTOP TABLE VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="py-4">Requester</th>
                <th>Asset Details</th>
                <th>Dates</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
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
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-700">
                          {ele.requesterName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {ele.requesterEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="font-semibold text-gray-700">
                      {ele.productName}
                    </p>
                    <span className="text-[10px] uppercase font-bold text-gray-400">
                      {ele.productType}
                    </span>
                  </td>
                  <td className="text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500">
                        Requested:{" "}
                        {new Date(ele.requestDate).toLocaleDateString()}
                      </span>
                      {ele.approvalDate && (
                        <span className="text-green-600 font-medium text-[11px]">
                          Approved:{" "}
                          {new Date(ele.approvalDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={ele.requestStatus} />
                  </td>
                  <td className="text-center">
                    <ActionButtons
                      status={ele.requestStatus}
                      onApprove={() => handleApproved(ele._id, ele.productId)}
                      onReject={() => handleReject(ele._id)}
                    />
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
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {ele.requesterName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {ele.requesterEmail}
                    </p>
                  </div>
                </div>
                <StatusBadge status={ele.requestStatus} />
              </div>

              <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-tighter">
                    Asset
                  </p>
                  <p className="font-bold text-gray-700">{ele.productName}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-tighter">
                    Date
                  </p>
                  <p className="text-gray-700">
                    {new Date(ele.requestDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 w-full pt-2">
                <ActionButtons
                  isMobile
                  status={ele.requestStatus}
                  onApprove={() => handleApproved(ele._id, ele.productId)}
                  onReject={() => handleReject(ele._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardAnimation>
  );
};





const ActionButtons = ({ status, onApprove, onReject, isMobile = false }) => {
  if (status !== "pending") {
    return (
      <span className="text-xs font-medium text-gray-400 italic">
        No actions needed
      </span>
    );
  }

  return (
    <div className={`flex gap-2 ${isMobile ? "w-full" : "justify-center"}`}>
      <button
        onClick={onApprove}
        className={`btn btn-success btn-sm ${isMobile ? "flex-1" : ""} text-white shadow-sm`}
      >
        <CheckCircle size={14} className="hidden sm:inline" /> Approve
      </button>
      <button
        onClick={onReject}
        className={`btn btn-error btn-sm btn-outline ${isMobile ? "flex-1" : ""}`}
      >
        <XCircle size={14} className="hidden sm:inline" /> Reject
      </button>
    </div>
  );
};

export default AllRequests;
