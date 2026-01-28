import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/Context';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { useAxios } from '../../Hooks/Api/useAxios';


const AuthEmployee = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInEmail } = useContext(AuthContext);
    const axiosSecure = useAxios();

    function onSubmit(data) {

        const EmplyeeData = {
            name: data.name,
            email: data.email,
            password: data.password,
            dateOfBirth: selectedDate,
            

        }


        signInEmail(data.email, data.password)
            .then(res => {
                if (res) {
                    axiosSecure.post('/user-employee', EmplyeeData)
                        .then(res => {
                            if (res) {
                                console.log(res);
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Successfully registered",
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                            }
                        })


                }
            })
            .catch(error => {
                console.log(error.message)
            });

    }


    return (
        <div>
            <div className="hero  min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" {...register('name')} required className="input" placeholder="Name" />

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
                                    <div><Link to='/auth/forget-pass' className="link link-hover">Forgot password?</Link></div>
                                    <button className="btn btn-neutral mt-4">Register</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthEmployee;