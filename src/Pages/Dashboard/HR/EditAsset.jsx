import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import DatePicker from 'react-datepicker';

const EditAsset = () => {


    const { register, handleSubmit } = useForm();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const axiosSecure = useAxios();
    const {id} = useParams();
    

    const { data: assets = {}, isLoading } = useQuery({
        queryKey: ["assets", id],
        queryFn: async ({queryKey}) => {
            const [, id] = queryKey;
            const res = await axiosSecure.get(`/all-asset/${id}`);
            return res.data;
        },

    });

 console.log(assets);
    const onSubmit = data => {

    }

    if (isLoading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">


                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Edit Product
                </h1>

                <div className="bg-white shadow-xl rounded-2xl p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Product Name</label>
                            <input
                                type="text"
                                {...register('productName')}
                                defaultValue={assets.name}
                                required
                                className="input input-bordered w-full"
                                placeholder="Product Name"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Company Name</label>
                            <input
                                type="text"
                                {...register('companyName')}
                                defaultValue={assets.companyName}
                                required
                                className="input input-bordered w-full"
                                placeholder="Company Name"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Product Image</label>
                            <input
                                type="file"
                                {...register('ProductImage')}
                                defaultValue={assets.image}
                                required
                                className="file-input file-input-bordered file-input-info w-full"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Product Type</label>
                            <select
                                defaultValue={assets.type}
                                {...register('productType')}
                                required
                                className="select select-bordered select-info w-full"
                            >
                                <option disabled>Product Type</option>
                                <option>Returnable</option>
                                <option>Non Returnable</option>
                            </select>
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Product Quantity</label>
                            <input
                                type="number"
                                defaultValue={assets.quantity}
                                {...register('productQuantity')}
                                required
                                className="input input-bordered w-full"
                                placeholder="Quantity"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Purchase Date</label>
                            <DatePicker
                                showIcon
                                defaultValue={assets.date}
                                selected={selectedDate}
                                onChange={setSelectedDate}
                                className="input input-bordered w-full"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">HR Email</label>
                            <input
                                type="email"
                                defaultValue={assets.email}
                                readOnly
                                {...register('email')}
                                required
                                className="input input-bordered w-full"
                                placeholder="Email"
                            />
                        </div>


                        <div className="col-span-1 md:col-span-2 flex justify-end">
                            <button className="btn btn-neutral w-full md:w-48 mt-4">
                                Add Product
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>

    );
};

export default EditAsset;