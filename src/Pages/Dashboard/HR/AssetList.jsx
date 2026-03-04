import React, { useContext, useState } from "react";
import { useAxios } from "../../../Hooks/Api/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { AuthContext } from "../../../Context/Context";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Gears Lottie Animation.json";
import { Edit, Trash2, Search, Package } from "lucide-react";
import { useDebounce } from "use-debounce";

const AssetList = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch] = useDebounce(searchText, 1000);
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assets", debouncedSearch, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-asset?email=${user?.email}&search=${debouncedSearch}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/all-asset/delete/${id}`)
      .then(() => refetch())
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
    <title>Asset-List | AssetVerse</title>
    <CardAnimation
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen p-4 lg:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="text-cyan-600" />
              Company Assets
            </h1>
            <p className="text-sm text-gray-500">
              Manage and track your organization's inventory
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              placeholder="Search by name..."
              className="w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 pl-9 focus:ring-3 focus:ring-sky-500 outline-none transition-all "
            />
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                <tr>
                  <th className="py-4">Asset</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Date Added</th>
                  <th className="text-right px-10">Actions</th>
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
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-xl ring-1 ring-gray-100">
                            <img
                              src={ele.productImage}
                              alt={ele.productName}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <span className="font-bold text-gray-700">
                          {ele.productName}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge badge-outline ${ele.productType === "Returnable" ? "badge-primary" : "badge-ghost"} font-medium`}
                      >
                        {ele.productType}
                      </span>
                    </td>
                    <td className="font-medium">{ele.productQuantity} pcs</td>
                    <td className="text-gray-500">
                      {new Date(ele.date).toLocaleDateString()}
                    </td>
                    <td className="text-right space-x-2 px-6">
                      <Link
                        to={`/dash/edit-asset/${ele._id}`}
                        className="btn btn-ghost btn-sm text-cyan-600 hover:bg-cyan-50"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(ele._id)}
                        className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. MOBILE CARD VIEW (Shown on Mobile Only) */}
          <div className="md:hidden divide-y divide-gray-100">
            {assets.length > 0 ? (
              assets.map((ele) => (
                <div key={ele._id} className="p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={ele.productImage}
                      className="w-14 h-14 rounded-2xl object-cover ring-1 ring-gray-100 shadow-sm"
                      alt=""
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">
                        {ele.productName}
                      </h3>
                      <span className="badge badge-sm badge-outline badge-info">
                        {ele.productType}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 bg-gray-50 rounded-xl p-3 text-sm">
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase font-bold">
                        In Stock
                      </p>
                      <p className="font-bold text-gray-700">
                        {ele.productQuantity} Units
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase font-bold">
                        Added
                      </p>
                      <p className="text-gray-700">
                        {new Date(ele.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/dash/edit-asset/${ele._id}`}
                      className="btn btn-sm flex-1 bg-cyan-50 border-none text-cyan-700 hover:bg-cyan-100"
                    >
                      <Edit size={14} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(ele._id)}
                      className="btn btn-sm flex-1 bg-red-50 border-none text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-400">
                No assets found.
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {!isLoading && assets.length === 0 && (
          <div className="text-center py-20">
            <Package className="mx-auto text-gray-200 mb-4" size={64} />
            <h3 className="text-xl font-medium text-gray-400">
              No assets found matching your search.
            </h3>
          </div>
        )}
      </div>
    </CardAnimation>
    </>
  );
};

export default AssetList;
