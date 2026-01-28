import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAxios } from '../../../Hooks/Api/useAxios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../../../Context/Context';
import axios from 'axios';


const AddAsset = () => {
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext)

    function onSubmit(data) {

        const imageFile = data.ProductImage[0];
        const formData = new FormData();
        formData.append('image', imageFile)


        const addedProduct = {
            productName: data.productName,
            companyName: data.companyName,
            hrEmail: user?.email,
            date: selectedDate,
            productImage: image,
            productType: data.productType,
            productQuantity: data.productQuantity
        }



        axiosSecure.post('/add-product', addedProduct)
            .then(res => {
                axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_FILE_KEY}`, formData)
                    .then(res => {
                        setImage(res.data.data.display_url);
                    })

                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Added",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
            .catch(err => console.log(err))


    }


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">


                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Add New Product
                </h1>

                <div className="bg-white shadow-xl rounded-2xl p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Product Name</label>
                            <input
                                type="text"
                                {...register('productName')}
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
                                required
                                className="file-input file-input-bordered file-input-info w-full"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Product Type</label>
                            <select
                                defaultValue="Product Type"
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
                                selected={selectedDate}
                                onChange={setSelectedDate}
                                className="input input-bordered w-full"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">HR Email</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
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

export default AddAsset;