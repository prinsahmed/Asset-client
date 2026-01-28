
import React, { useContext, useState } from 'react';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { AuthContext } from '../../../Context/Context';

const AssetList = () => {
    const [searchText, setSearchText] = useState("");
    const axiosSecure = useAxios();
    const {user} = useContext(AuthContext)

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
        return <span className="loading loading-spinner loading-xl"></span>;
    }

    const handleDelete = (id) => {

        axiosSecure.delete(`/all-asset/delete/${id}`)
            .then(() => refetch())
            .catch(err => console.log(err.message))
    }





    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
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
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Head */}
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th>Asset Image</th>
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
                                                    <div className="w-12 rounded-xl">
                                                        <img src={ele.image} alt="Asset" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-semibold">{ele.productName

                                            }</td>
                                            <td>
                                                <span className="badge badge-info badge-outline">
                                                    {ele.productType}
                                                </span>
                                            </td>
                                            <td>{ele.productQuantity}</td>
                                            <td>{ele.date}</td>
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
        </div>

    );
};

export default AssetList;