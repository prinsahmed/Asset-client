import React, { useContext } from 'react';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { AuthContext } from '../../../Context/Context';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import CardAnimation from '../../../Components/Animations/CardAnimation';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/Gears Lottie Animation.json'




const EmployeeRequest = () => {
    const axiosSecure = useAxios();
    const { user, userData } = useContext(AuthContext)


    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["HRId", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/employee-request?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });



    if (isLoading) {
        return <div className=' h-dvh flex justify-center items-center '>
            <Lottie style={{ width: 400, height: 400 }} animationData={loadingAnimation} loop={true} />
        </div>
    }

    const handleApproved = (id, employeeEmail) => {

        const update = {
            status: 'approved',
            companyName: userData.companyName

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



        axiosSecure.put(`/employee-company?email=${employeeEmail}`, { companyName: userData.companyName })
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
        <CardAnimation
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            className="p-6 min-h-screen ">

            <div className=" mb-1">
                <h2 className="text-xl font-semibold">Employee Requests</h2>
            </div>
            <div className="bg-base-200 rounded-lg shadow-lg">


                {/* Table */}
                <div className="overflow-x-auto rounded-lg">
                    <table className="table table-zebra w-full">
                        <thead className='bg-gray-200 text-gray-700 '>
                            <tr>
                                <th>Image</th>
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
                                        <td><img className='w-10 h-10 rounded-full' src={ele.employeeImage} alt={ele.employeeName} /></td>
                                        <td>
                                            <div>

                                                <p className="text-sm text-gray-500">{ele.employeeName}</p>
                                            </div>
                                        </td>
                                        <td>{ele.companyName}</td>
                                        <td>{new Date(ele.affiliationDate).toLocaleDateString()}</td>
                                        <td>{new Date(ele.approvalDate).toLocaleDateString()}</td>
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
        </CardAnimation>
    );
};

export default EmployeeRequest;