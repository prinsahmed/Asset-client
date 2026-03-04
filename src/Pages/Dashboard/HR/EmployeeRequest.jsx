import React, { useContext } from "react";
import { useAxios } from "../../../Hooks/Api/useAxios";
import { AuthContext } from "../../../Context/Context";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Gears Lottie Animation.json";
import { UserCheck, UserX, Calendar, Briefcase, Mail } from "lucide-react";

const EmployeeRequest = () => {
  const axiosSecure = useAxios();
  const { user, userData } = useContext(AuthContext);

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["HRId", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employee-request?email=${user?.email}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleApproved = (id, employeeEmail) => {
    const update = {
      status: "approved",
      companyName: userData.companyName,
    };

    axiosSecure
      .put(`/employee-approval/${id}`, update)
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

    axiosSecure
      .put(`/employee-company?email=${employeeEmail}`, {
        companyName: userData.companyName,
      })
      .catch((err) => console.log(err.message));
  };

  const handleReject = (id) => {
    const status = { status: "rejected" };
    axiosSecure
      .put(`/employee-reject/${id}`, status)
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
      <div className="h-dvh flex justify-center items-center">
        <Lottie
          style={{ width: 400, height: 400 }}
          animationData={loadingAnimation}
          loop={true}
        />
      </div>
    );
  }

  return (
    <>
    <title>Employee-Requests | AssetVerse</title>
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
            <UserCheck className="text-cyan-600" />
            Employee Affiliation Requests
          </h2>
          <p className="text-sm text-gray-500">
            Manage team members waiting to join {userData?.companyName}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 1. DESKTOP TABLE VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="py-4">Employee</th>
                <th>Company</th>
                <th>Request Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {assets?.map((ele) => (
                <tr
                  key={ele._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full ring-1 ring-offset-2 ring-gray-100">
                          <img src={ele.employeeImage} alt={ele.employeeName} />
                        </div>
                      </div>
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
                  <td className="text-gray-600 font-medium">
                    <div className="flex items-center gap-1">
                      <Briefcase size={14} className="text-gray-400" />
                      {ele.companyName || "N/A"}
                    </div>
                  </td>
                  <td className="text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(ele.affiliationDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={ele.status} />
                  </td>
                  <td className="text-center">
                    <ActionButtons
                      status={ele.status}
                      onApprove={() =>
                        handleApproved(ele._id, ele.employeeEmail)
                      }
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
          {assets?.length > 0 ? (
            assets.map((ele) => (
              <div key={ele._id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img
                      src={ele.employeeImage}
                      className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100"
                      alt=""
                    />
                    <div>
                      <h3 className="font-bold text-gray-800 leading-tight">
                        {ele.employeeName}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Mail size={12} /> {ele.employeeEmail}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={ele.status} />
                </div>

                <div className="grid grid-cols-2 bg-gray-50 rounded-xl p-3 text-xs gap-2">
                  <div>
                    <p className="text-gray-400 font-bold uppercase tracking-tighter">
                      Requested On
                    </p>
                    <p className="text-gray-700 font-medium">
                      {new Date(ele.affiliationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-bold uppercase tracking-tighter">
                      Company
                    </p>
                    <p className="text-gray-700 font-medium truncate">
                      {ele.companyName || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <ActionButtons
                    isMobile
                    status={ele.status}
                    onApprove={() => handleApproved(ele._id, ele.employeeEmail)}
                    onReject={() => handleReject(ele._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-400 italic">
              No join requests found.
            </div>
          )}
        </div>
      </div>
    </CardAnimation>
    </>
  );
};

// --- HELPER COMPONENTS ---

const ActionButtons = ({ status, onApprove, onReject, isMobile = false }) => {
  if (status !== "pending") {
    return (
      <span className="text-xs font-medium text-gray-400 italic">
        Processed
      </span>
    );
  }

  return (
    <div className={`flex gap-2 ${isMobile ? "w-full" : "justify-center"}`}>
      <button
        onClick={onApprove}
        className={`btn btn-success btn-sm ${isMobile ? "flex-1" : ""} text-white`}
      >
        <UserCheck size={14} className="hidden sm:inline" /> Accept
      </button>
      <button
        onClick={onReject}
        className={`btn btn-error btn-sm btn-outline ${isMobile ? "flex-1" : ""}`}
      >
        <UserX size={14} className="hidden sm:inline" /> Reject
      </button>
    </div>
  );
};

export default EmployeeRequest;
