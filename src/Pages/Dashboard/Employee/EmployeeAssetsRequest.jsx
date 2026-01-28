import React, { useContext } from 'react';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { AuthContext } from '../../../Context/Context';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const EmployeeAssetsRequest = () => {

    const axiosSecure = useAxios();
    const {  user } = useContext(AuthContext);

    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["userEmail", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/employee-assets-request?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

console.log(assets);

    function handleRequest(id, companyName, hrEmail, productName, productType, productImage) {
        const productData = {

            requesterName: user?.displayName,
            requesterEmail: user?.email,
            companyName: companyName,
            hrEmail: hrEmail,
            productName: productName,
            productType: productType,
            requestDate: new Date(),
            approvalDate: null,
            requestStatus: 'pending',
            productId: id,
            productImage:productImage

        }

        axiosSecure.post('/employee-add-request', productData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Requested For Asset",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })



    }





    return (
        <div className="bg-[#F3F4F6] min-h-screen p-8 ">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Request Assets</h1>
                <p className="text-gray-500 font-medium mt-2">Choose from the available company inventory below.</p>
                <div className="h-1 w-20 bg-indigo-600 mt-4 rounded-full"></div>
            </div>

            {/* Grid Container */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">



                {
                    assets.map(ele => {
                        return <div key={ele._id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-transparent hover:border-indigo-200 hover:shadow-xl transition-all duration-500 group">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gray-100 mb-6">
                                <img
                                    src={ele.productImage}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Mouse"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-600 shadow-sm">
                                        {ele.productType}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">{ele.productName}</h3>
                                </div>

                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Availability</span>
                                    <span className="text-sm font-black text-emerald-600">{ele.productQuantity}</span>
                                </div>

                                <button
                                    onClick={() => {
                                        handleRequest(ele._id, ele.companyName, ele.hrEmail, ele.productName, ele.productType, ele.productImage)
                                    }}
                                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm tracking-wide group-hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-gray-200">
                                    REQUEST ITEM
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default EmployeeAssetsRequest;