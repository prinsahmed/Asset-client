
import React, { useContext, useState } from 'react';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { AuthContext } from '../../../Context/Context';
import CardAnimation from '../../../Components/Animations/CardAnimation';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/Gears Lottie Animation.json'




const AssetList = () => {
    const [searchText, setSearchText] = useState("");
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext)

    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["assets", searchText, user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-asset?email=${user?.email}&search=${searchText}`);
            return res.data;
        },
        enabled: !!user?.email

    });

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    if (isLoading) {
        return <div className=' h-dvh flex justify-center items-center '>
            <Lottie style={{ width: 400, height: 400 }} animationData={loadingAnimation} loop={true} />
        </div>
    }

    const handleDelete = (id) => {

        axiosSecure.delete(`/all-asset/delete/${id}`)
            .then(() => refetch())
            .catch(err => console.log(err.message))
    }





    return (
        <CardAnimation
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            className="min-h-screen  p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-1">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Company Assets
                    </h1>

                    <input
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search assets..."
                        className="input input-bordered w-full md:w-72 mt-4 md:mt-0"
                    />
                </div>

                {/* Table Card */}
                <div className="bg-white  rounded-lg overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Head */}
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                    <th>Date Added</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>

                                {
                                    assets.map(ele => {
                                        return <tr key={ele._id} className="hover">
                                            <td>
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img src={ele.productImage} alt={ele.productName} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-semibold">{ele.productName}</td>
                                            <td>
                                                <span className="badge badge-info badge-outline">
                                                    {ele.productType}
                                                </span>
                                            </td>
                                            <td>{ele.productQuantity}</td>
                                            <td>{new Date(ele.date).toLocaleDateString()}</td>
                                            <td className="text-center space-x-2">
                                                <Link to={`/dash/edit-asset/${ele._id}`} className="btn btn-sm btn-outline btn-info">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(ele._id)} className="btn btn-sm btn-outline btn-error">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                }



                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </CardAnimation>

    );
};

export default AssetList;