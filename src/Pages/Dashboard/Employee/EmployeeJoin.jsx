import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { AuthContext } from '../../../Context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import CardAnimation from '../../../Components/Animations/CardAnimation';

const EmployeeJoin = () => {
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext)

    function onSubmit(data) {

        const imageFile = data.userImage[0];
        const formData = new FormData();
        formData.append('image', imageFile)



        axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_FILE_KEY}`, formData)
            .then(res => {

                const user = {
                    employeeName: data.employeeName,
                    employeeEmail: data.UserEmail,
                    hrEmail: data.HrEmail,
                    affiliationDate: new Date(),
                    approvalDate: null,
                    employeeImage: res.data.data.display_url,
                    status: 'pending'
                }

                axiosSecure.post('/employee-join', user)
                    .catch(err => console.log(err.message))

                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Requested",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
            .catch(err => console.log(err))


    }



    return (
        <CardAnimation
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            className="min-h-screen  p-4">
            <div className="max-w-7xl mx-auto">


                <h1 className="text-xl font-semibold mb-1 text-gray-800">
                    Join a Company
                </h1>

                <div className="bg-white  p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">


                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Name</label>
                            <input
                                type="text"
                                {...register('employeeName')}
                                required
                                className="input input-bordered w-full"
                                placeholder="Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Email</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                readOnly
                                {...register('UserEmail')}
                                required
                                className="input input-bordered w-full"
                                placeholder="Email"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Image</label>
                            <input
                                type="file"
                                {...register('userImage')}
                                required
                                className="file-input file-input-bordered file-input-info w-full"
                            />
                        </div>



                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">HR Email</label>
                            <input
                                type="email"
                                {...register('HrEmail')}
                                required
                                className="input input-bordered w-full"
                                placeholder="Email"
                            />
                        </div>


                        <div className="col-span-1 md:col-span-2 flex justify-end">
                            <button className="btn btn-neutral w-full md:w-48 mt-4">
                                Join
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </CardAnimation>
    );
};

export default EmployeeJoin;