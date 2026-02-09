import React, { useContext } from 'react';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/Context';
import Swal from 'sweetalert2';
import CardAnimation from '../../../Components/Animations/CardAnimation';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/Gears Lottie Animation.json'




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
        axiosSecure.put(`/employee-assets-return/${id}`, { requestStatus: 'returned' })
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

    if (isLoading) return <div className=' h-dvh flex justify-center items-center '>
        <Lottie style={{ width: 400, height: 400 }} animationData={loadingAnimation} loop={true} />
    </div>

    return (
        <CardAnimation
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            className="max-w-7xl   min-h-dvh  p-4">


            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold mb-1 text-gray-800">Assigned Assets</h2>
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
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-200 rounded-xl text-gray-700">
                        <tr>
                            <th className='rounded-l-lg'>Asset Image</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                            <th>Company Name</th>
                            <th>Request Date</th>
                            <th>Approval Date</th>
                            <th>Status</th>
                            <th className='rounded-r-lg'>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y rounded-b-lg divide-gray-200">


                        {
                            assets.map(ele => {
                                return <tr key={ele._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img src={ele.productImage} className="h-10 w-10 rounded-full" alt={ele.productName} />
                                    </td>
                                    <td className="px-6 py-2 text-gray-800 font-medium">{ele.productName}</td>
                                    <td className="px-6 py-2"><span className="px-2 py-1 rounded-2xl bg-green-100 text-green-800 text-sm font-semibold">{ele.productType}</span></td>
                                    <td className="px-6 py-2 text-gray-600">
                                        {ele.companyName}
                                    </td>
                                    <td className="px-6 py-2 text-gray-600">
                                        {new Date(ele.requestDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-2 text-gray-600">{new Date(ele.approvalDate).toLocaleDateString()}

                                    </td>
                                    <td className="px-6 py-2">
                                        <span className="px-2 py-1 rounded-2xl bg-blue-100 text-blue-800 text-sm font-semibold">{ele.requestStatus}</span>
                                    </td>
                                    <td className="px-6 py-2">{
                                        (ele.productType === 'Returnable' && ele.requestStatus === 'approved')
                                        && <button onClick={() => handleReturn(ele._id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Return</button>
                                    }</td>
                                </tr>
                            })
                        }



                    </tbody>
                </table>
            </div>
        </CardAnimation>
    );
};

export default EmployeeAssets;