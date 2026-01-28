import React, { useContext } from 'react';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { AuthContext } from '../../../Context/Context';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const EmployeeRequest = () => {
    const axiosSecure = useAxios();
    const { user, userCompany } = useContext(AuthContext)


    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["HRId", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/employee-request?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });



    if (isLoading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }

    const handleApproved = (id, employeeEmail) => {

        const update = {
            status: 'approved',
            companyName: userCompany

        }

        
        
        
        axiosSecure.put(`/employee-approval/${id}`, update)
        .then(res => {
            
                if (res.data.modifiedCount === 1) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Approved",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    
                    refetch()
                }
            })
            .catch(err => console.log(err.message))



            axiosSecure.put(`/employee-company?email=${employeeEmail}`, {companyName:userCompany})
                .catch(err => console.log(err.message))

        }

    const handleReject = (id) => {
        const status = { status: 'rejected' }
        axiosSecure.put(`/employee-reject/${id}`, status)
            .then(res => {
                if (res.data.modifiedCount === 1) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Rejected",
                        showConfirmButton: false,
                        timer: 1000
                    });

                    refetch()
                }
            })
            .catch(err => console.log(err.message))
    }


    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div className="bg-base-100 rounded-xl shadow-lg p-4">

                {/* Header */}
                <div className=" mb-4">
                    <h2 className="text-xl font-semibold">Employee Requests</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Requester</th>
                                <th>Company</th>
                                <th>Request Date</th>
                                <th>Approval Date</th>
                                <th>Status</th>

                            </tr>
                        </thead>

                        <tbody>


                            {
                                assets?.map(ele => {
                                    return <tr key={ele._id} >
                                        <td>
                                            <div>

                                                <p className="text-sm text-gray-500">{ele.employeeName}</p>
                                            </div>
                                        </td>
                                        <td>{ele.companyName}</td>
                                        <td>{ele.affiliationDate}</td>
                                        <td>{ele.approvalDate}</td>
                                        <td>
                                            <span className="badge badge-warning">{ele.status}</span>
                                        </td>
                                        <td className="flex gap-2 justify-center">
                                            <button onClick={() => {
                                                handleApproved(ele._id, ele.employeeEmail)

                                            }} className="btn btn-success btn-xs">Approve</button>
                                            <button onClick={() => {
                                                handleReject(ele._id)

                                            }} className="btn btn-error btn-xs">Reject</button>
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

export default EmployeeRequest;