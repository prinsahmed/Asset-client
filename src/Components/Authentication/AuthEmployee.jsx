import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/Context';
import { Link } from 'react-router';


const AuthEmployee = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInEmail, passResetEmail } = useContext(AuthContext);

    function onSubmit(data) {
        signInEmail(data.email, data.password)
            .catch(error => {
                console.log(error.message)
            });

    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
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
                                    <div><Link to ='/auth/forget-pass' className="link link-hover">Forgot password?</Link></div>
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