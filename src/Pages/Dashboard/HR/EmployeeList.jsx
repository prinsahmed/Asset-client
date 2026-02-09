import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/Context';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../../Hooks/Api/useAxios';
import Swal from 'sweetalert2';
import CardAnimation from '../../../Components/Animations/CardAnimation';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/Gears Lottie Animation.json'



const EmployeeList = () => {
    const { user } = useContext(AuthContext);
    const [action, setAction] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const axiosSecure = useAxios()

    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["HRId", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/employee-list?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <div className=' h-dvh flex justify-center items-center '>
        <Lottie style={{ width: 400, height: 400 }} animationData={loadingAnimation} loop={true} />
    </div>

    function handleRemove(id) {

        axiosSecure.delete(`/employee-delete/${id}`)
            .then((res) => {
                if (res.data.deletedCount === 1) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Deleted",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    refetch()
                }
            })
    }






    return (

        <CardAnimation
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            className='min-h-screen  p-6'>
            <div className='max-w-7xl mx-auto'>
                <div className="flex  items-center justify-between  mb-1">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Team Members
                        </h2>
                        <p className="text-sm text-gray-500">
                            {assets.length} / 5
                        </p>
                    </div>

                    <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
                        Invite Employee
                    </button>
                </div>
                <div className="bg-white rounded-lg  border-gray-200 shadow-sm">


                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg">
                        <table className="w-full text-sm">
                            <thead className='bg-gray-200 rounded-lg  text-gray-700 '>
                                <tr className="text-gray-500  ">
                                    <th className="p-3 text-left">Employee</th>
                                    <th className=" text-left">Join Date</th>
                                    <th className=" text-center">Assets</th>
                                    <th className="p-3 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Row 1 */}
                                {
                                    assets.map(ele => {
                                        return <tr className=" hover:bg-gray-50">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={ele.employeeImage}
                                                        className="w-10 h-10 rounded-full"
                                                        alt=""
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-800">
                                                            {ele.employeeName}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {ele.employeeEmail}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-600">{ele.approvalDate}</td>
                                            <td className="py-4 text-center">
                                                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium">
                                                    5
                                                </span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button onClick={() => {
                                                    setAction('remove')
                                                    setSelectedId(ele._id)
                                                }} className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                    {
                        action === 'remove' ? <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
                            <p className="text-sm text-red-700">
                                Are you sure you want to remove this employee?
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setAction(null)} className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100">
                                    Cancel
                                </button>
                                <button onClick={() => {
                                    handleRemove(selectedId)
                                    setAction(null)
                                }} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700">
                                    Confirm Remove
                                </button>
                            </div>
                        </div> : ''
                    }

                </div>
            </div>
        </CardAnimation>

    );
};

export default EmployeeList;