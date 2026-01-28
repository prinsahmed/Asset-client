import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAxios } from '../../../Hooks/Api/useAxios';
import { AuthContext } from '../../../Context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';

const EmployeeJoin = () => {
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState();
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext)

    function onSubmit(data) {

        const imageFile = data.userImage[0];
        const formData = new FormData();
        formData.append('image', imageFile)


        const user = {
            employeeName: data.employeeName,
            employeeEmail:data.UserEmail,
            hrEmail: data.HrEmail,
            affiliationDate: new Date(),
            approvalDate: null,
            employeeImage: image,
            status: 'pending'
        }



        axiosSecure.post('/employee-join', user)
            .then(res => {
                axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_FILE_KEY}`, formData)
                    .then(res => {
                        setImage(res.data.data.display_url);
                    })

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
        <div className="min-h-screen bg-[#F5F8FF] p-4">
            <div className="max-w-7xl mx-auto">


                <h1 className="text-3xl font-bold mb-6 text-gray-800">
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
        </div>
    );
};

export default EmployeeJoin;