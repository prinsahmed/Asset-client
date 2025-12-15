import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAxios } from '../../../Hooks/Api/useAxios';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllRequests = () => {
    const axiosSecure = useAxios();




    const { data: assets = [], isLoading } = useQuery({
        queryKey: ["requestAssets"],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-requests');
            return res.data;
        },

    });


    if (isLoading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }


    const handleApproved = (id) => {
        const requestStatus = { requestStatus: 'approved' }
        axiosSecure.patch(`/asset-approval/${id}`, requestStatus)
            .then(res => {
                if (res.modifiedCount === 1) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Approved",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    
                }
            })
            .catch(err => console.log(err.message))
    }
    
    const handleReject = (id) => {
        const requestStatus = { requestStatus: 'rejected' }
        axiosSecure.patch(`/asset-reject/${id}`, requestStatus)
            .then(res => {
                if (res.modifiedCount === 1) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Rejected",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    
                }
            })
            .catch(err => console.log(err.message))
    }



    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div className="bg-base-100 rounded-xl shadow-lg p-4">

                {/* Header */}
                <div className=" mb-4">
                    <h2 className="text-xl font-semibold">Employee Asset Requests</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Requester</th>
                                <th>Asset</th>
                                <th>Type</th>
                                <th>Company</th>
                                <th>Request Date</th>
                                <th>Approval Date</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* Row 1 */}
                            {
                                assets.map(ele => {
                                    return <tr>
                                        <td>
                                            <div>
                                                <p className="font-medium">{ele.requesterName}</p>
                                                <p className="text-sm text-gray-500">{ele.requesterEmail}</p>
                                            </div>
                                        </td>
                                        <td>{ele.productName}</td>
                                        <td>{ele.productType}</td>
                                        <td>{ele.companyName}</td>
                                        <td>{ele.date}</td>
                                        <td>{ele.approvalDate}</td>
                                        <td>
                                            <span className="badge badge-warning">{ele.requestStatus}</span>
                                        </td>
                                        <td className="flex gap-2 justify-center">
                                            <button onClick={() => handleApproved(ele._id)} className="btn btn-success btn-xs">Approve</button>
                                            <button onClick={() => handleReject(ele._id)} className="btn btn-error btn-xs">Reject</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AllRequests;