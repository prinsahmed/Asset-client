import React, { useContext, useState } from 'react';
import NavBar from '../Navigation/NavBar';
import { Link, Outlet, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';
import { useAxios } from '../../Hooks/Api/useAxios';
import axios from 'axios';
import CardAnimation from '../Animations/CardAnimation';
import regImage from '../../assets/Filing system-pana.png'


const AuthHR = () => {

    const { signInEmail } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxios();
    const navigate = useNavigate()


    function onSubmit(data) {

        Swal.fire({
            title: 'Processing',
            html: 'Storing your data, please wait.',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const imageFile = data.companyLogo[0];
        const formData = new FormData();
        formData.append('image', imageFile)


        signInEmail(data.email, data.password)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Successfully registered",
                    showConfirmButton: false,
                    timer: 1000
                });

                axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_FILE_KEY}`, formData)
                    .then(res => {

                        const HRData = {
                            name: data.name,
                            companyName: data.companyName,
                            companyLogo: res.data.data.display_url,
                            email: data.email,
                            password: data.password,
                            dateOfBirth: selectedDate

                        }
                        navigate('/dash')
                        axiosSecure.post('/user-HR', HRData)

                    })
                    .catch(error => {
                        console.log(error.message)
                        Swal.fire({
                            icon: 'error',
                            title: 'Login Failed',
                            text: error.message,
                            confirmButtonColor: '#4f46e5'
                        });
                    })
            })


    }
    return (

        <CardAnimation
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
        >
            <div className="hero bg-white">
                <div className="flex items-center gap-x-16 justify-center ">
                    <div>
                        <img className='w-[41rem]' src={regImage} alt="Filing system-pan" />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
                        <div className="card-body">
                            <h2 className='text-2xl text-[#90CAF9] font-bold'>Registration</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <fieldset className="fieldset space-y-1">
                                    <label className="label">Name</label>
                                    <input type="text" {...register('name')} required className="input" placeholder="Name" />

                                    <label className="label">Company Name</label>
                                    <input type="text" {...register('companyName')} required className="input" placeholder="Company name" />

                                    <label className="label">Company Logo</label>
                                    <input type="file" {...register('companyLogo')} required className="file-input file-input-info" placeholder="Company logo" />

                                    <label className="label">Email</label>
                                    <input type="email" {...register('email')} required className="input" placeholder="Email" />

                                    <label className="label">Password</label>
                                    <input type="password" {...register('password',
                                        {
                                            required: 'Password is required',
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                                                message: 'Must have lowercase, uppercase, number and minimum 6 characters'
                                            }
                                        })
                                    } className="input" placeholder="Password" />
                                    <p className='text-red-500'>{errors.password?.message}</p>

                                    <label className='label mt-2'>Date of Birth</label>
                                    <DatePicker showIcon selected={selectedDate} onChange={setSelectedDate} />

                                    <button className="btn btn-neutral hover:scale-105 transition-all duration-400 mt-4">Register</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </CardAnimation>
    );
};

export default AuthHR;