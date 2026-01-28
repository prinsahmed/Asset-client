import React, { useContext, useState } from 'react';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/Context';
import Swal from 'sweetalert2';

const EmployeeAssets = () => {
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext);

    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["emplyeeEmail", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/employee-assets?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    function handleReturn(id) {
        axiosSecure.put(`/employee-assets-return/${id}`, {requestStatus:'returned'})
            .then(res => {
                if (res.data.modifiedCount === 1) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Returned",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    refetch()
                }
            })
    }



    return (
        <div className="max-w-7xl mx-auto bg-[#F5F8FF] min-h-dvh  p-4">


            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Assigned Assets</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Print
                </button>
            </div>


            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search by Asset Name"
                    className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select className="w-full sm:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>All Types</option>
                    <option>Returnable</option>
                    <option>Non-returnable</option>
                </select>
            </div>


            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Asset Image</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Asset Name</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Asset Type</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Company Name</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Request Date</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Approval Date</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">


                        {
                            assets.map(ele => {
                                return <tr key={ele._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4"><img src="https://via.placeholder.com/50" className="h-12 w-12 rounded-md" /></td>
                                    <td className="px-6 py-4 text-gray-800 font-medium">{ele.productName}</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-2xl bg-green-100 text-green-800 text-sm font-semibold">{ele.productType}</span></td>
                                    <td className="px-6 py-4 text-gray-600">{ele.companyName}</td>
                                    <td className="px-6 py-4 text-gray-600">{ele.requestDate}</td>
                                    <td className="px-6 py-4 text-gray-600">{ele.approvalDate}</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-2xl bg-blue-100 text-blue-800 text-sm font-semibold">{ele.requestStatus}</span></td>
                                    <td className="px-6 py-4">{
                                        (ele.productType === 'Returnable' && ele.requestStatus === 'approved')
                                        && <button onClick={() => handleReturn(ele._id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Return</button>
                                    }</td>
                                </tr>
                            })
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeAssets;