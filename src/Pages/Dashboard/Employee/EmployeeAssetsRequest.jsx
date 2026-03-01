import React, { useContext, useState } from "react";
import { useAxios } from "../../../Hooks/Api/useAxios";
import { AuthContext } from "../../../Context/Context";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Gears Lottie Animation.json";
import {
  Search,
  Filter,
  PackageOpen,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useDebounce } from "use-debounce";

const EmployeeAssetsRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 1000);
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);
  const [filterType, setFilterType] = useState("All Types");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["query", debouncedSearch, filterType, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employee-assets-request?email=${user?.email}&search=${debouncedSearch}&filter=${filterType}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });



  const handleRequest = (
    id,
    companyName,
    hrEmail,
    productName,
    productType,
    productImage,
  ) => {
    const productData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      companyName,
      hrEmail,
      productName,
      productType,
      requestDate: new Date(),
      approvalDate: null,
      requestStatus: "pending",
      productId: id,
      productImage,
    };

    axiosSecure
      .post("/employee-add-request", productData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Request Sent!",
            text: `Your request for ${productName} is now pending.`,
            showConfirmButton: false,
            timer: 2000,
            background: "#ffffff",
            iconColor: "#4f46e5",
          });
        }
      })
      .catch((err) => {
        Swal.fire(
          "Error",
          "Could not process request. Please try again.",
          "error",
        );
      });
  };

  if (isLoading)
    return (
      <div className="h-dvh flex justify-center items-center bg-white">
        <Lottie
          style={{ width: 350, height: 350 }}
          animationData={loadingAnimation}
          loop={true}
        />
      </div>
    );

  return (
    <CardAnimation
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 lg:p-10 bg-[#fcfcfd]"
    >
      {/* --- HERO HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-widest uppercase">
              <Sparkles size={16} />
              <span>Inventory Portal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Request <span className="text-indigo-600">Assets</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-md">
              Browse and request equipment from your company's live inventory.
            </p>
          </div>

          {/* Search & Filter UI Bar */}
          <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 w-full lg:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name..."
                className="input input-ghost pl-12 w-full sm:w-72 focus:bg-transparent focus:outline-none text-gray-700 font-medium"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="h-10 w-[1px] bg-gray-100 hidden sm:block"></div>
            <select
              className="select select-ghost focus:bg-transparent focus:outline-none font-bold text-gray-600"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>All Types</option>
              <option>Returnable</option>
              <option>Non Returnable</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- ASSETS GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {assets.length > 0 ? (
          assets.map((ele) => {
            const isStockOut = ele.productQuantity < 1;

            return (
              <div
                key={ele._id}
                className="group relative bg-white rounded-[2.5rem] p-3 pb-7 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(79,70,229,0.12)] transition-all duration-700 border border-gray-100/50 hover:border-indigo-100 flex flex-col h-full"
              >
                {/* Image Canvas */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] bg-gray-50 mb-6">
                  <img
                    src={ele.productImage}
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isStockOut ? "grayscale opacity-40" : ""}`}
                    alt={ele.productName}
                  />

                  {/* Glass Badges */}
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                    <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-600 shadow-sm border border-white/20">
                      {ele.productType}
                    </span>
                    {isStockOut && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase shadow-lg shadow-red-200">
                        OUT
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Container */}
                <div className="px-4 flex flex-col flex-grow">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {ele.companyName}
                      </p>
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-800 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {ele.productName}
                    </h3>
                  </div>

                  <div className="mt-auto space-y-6">
                    {/* Availability Indicator */}
                    <div className="flex items-center justify-between bg-gray-50/50 border border-gray-100 p-4 rounded-3xl">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                          Availability
                        </span>
                        <span
                          className={`text-sm font-black ${isStockOut ? "text-red-500" : "text-emerald-600"}`}
                        >
                          {ele.productQuantity} Units
                        </span>
                      </div>
                      <div className="h-8 w-[1px] bg-gray-200"></div>
                      <div className="text-right">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                          Reference
                        </span>
                        <span className="text-xs font-bold text-gray-700">
                          #{ele._id.slice(-4)}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      disabled={isStockOut}
                      onClick={() =>
                        handleRequest(
                          ele._id,
                          ele.companyName,
                          ele.hrEmail,
                          ele.productName,
                          ele.productType,
                          ele.productImage,
                        )
                      }
                      className={`w-full py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group/btn shadow-xl
                                                ${
                                                  isStockOut
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-gray-900 text-white hover:bg-indigo-600 shadow-indigo-100 hover:shadow-indigo-200"
                                                }`}
                    >
                      {isStockOut ? (
                        <>
                          <AlertCircle size={16} /> NO STOCK
                        </>
                      ) : (
                        <>
                          <span className="relative z-10 uppercase">
                            Confirm Request
                          </span>
                          <CheckCircle2
                            size={16}
                            className="relative z-10 group-hover/btn:rotate-[360deg] transition-transform duration-500"
                          />
                          <div className="absolute inset-0 w-1/3 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/btn:translate-x-[400%] transition-transform duration-1000"></div>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State */
          <div className="col-span-full py-24 text-center">
            <div className="bg-white inline-block px-16 py-12 rounded-[3rem] shadow-sm border border-gray-100">
              <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageOpen size={36} className="text-indigo-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-800">
                No Assets Available
              </h3>
              <p className="text-gray-400 font-medium mt-2 max-w-xs mx-auto">
                We couldn't find any items matching your search. Try broadening
                your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("All Types");
                }}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </CardAnimation>
  );
};

export default EmployeeAssetsRequest;
