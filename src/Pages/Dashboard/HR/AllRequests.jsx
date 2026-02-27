import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useAxios } from '../../../Hooks/Api/useAxios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/Context';
import CardAnimation from '../../../Components/Animations/CardAnimation';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/Gears Lottie Animation.json'



const AllRequests = () => {
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext)


    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["userEmail", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-requests?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });


    if (isLoading) {
        return <div className=' min-h-screen flex justify-center items-center '>
            <Lottie style={{ width: 400, height: 400 }} animationData={loadingAnimation} loop={true} />
        </div>
    }


    const handleApproved = (id, productId) => {
        const update = {
            requestStatus: 'approved',
            productId: productId
        }
        axiosSecure.put(`/asset-approval/${id}`, update)
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
    }

    const handleReject = (id) => {
        const requestStatus = { requestStatus: 'rejected' }
        axiosSecure.put(`/asset-reject/${id}`, requestStatus)
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
            className="p-6  min-h-screen ">

            <div className=" mb-1">
                <h2 className="text-xl font-semibold"> Asset Requests</h2>
            </div>
            <div className="bg-base-100 rounded-lg  shadow-sm ">


                {/* Table */}
                <div className="overflow-x-auto rounded-lg">
                    <table className="table table-zebra w-full">
                        <thead className='bg-gray-200 text-gray-700 '>
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
                                    return <tr key={ele._id}>
                                        <td>
                                            <div>
                                                <p className="font-medium">{ele.requesterName}</p>
                                                <p className="text-sm text-gray-500">{ele.requesterEmail}</p>
                                            </div>
                                        </td>
                                        <td>{ele.productName}</td>
                                        <td>{ele.productType}</td>
                                        <td>{ele.companyName}</td>
                                        <td>{new Date(ele.requestDate).toLocaleDateString()}</td>
                                        {ele?.approvalDate
                                            ? new Date(ele.approvalDate).toLocaleDateString()
                                            : "Not Approved Yet"}

                                        <td>
                                            <span className="badge badge-warning">{ele.requestStatus}</span>
                                        </td>
                                        <td className="flex gap-2 justify-center">
                                            <button onClick={() => handleApproved(ele._id, ele.productId)} className="btn btn-success btn-xs">Approve</button>
                                            <button onClick={() => handleReject(ele._id)} className="btn btn-error btn-xs">Reject</button>
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

export default AllRequests;