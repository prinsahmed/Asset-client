import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../Firebase/firebase';
import Swal from 'sweetalert2';
import CardAnimation from '../Animations/CardAnimation';
import regImage from '../../assets/Computer login-bro.png'
import { Link, useNavigate } from 'react-router';


const UserLogin = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(res => {
                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully logged in",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dash')
                }
            })
            .catch(error => console.log(error.message))
    }

    return (
        <CardAnimation
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
            className='bg-white  h-dvh'>
            <div className='flex items-center gap-x-16 justify-center '>
                <div>
                    <img className='w-[38rem]' src={regImage} alt="Computer login-rafiki" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <fieldset className="fieldset  w-xs  p-4">
                        <h2 className='text-2xl text-[#90CAF9] font-bold'>Login</h2>
                        <label className="label">Email</label>
                        <input type="email" {...register('email')} className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input type="password" {...register('password')} className="input" placeholder="Password" />
                        <div><Link to='/auth/forget-pass' className="link link-hover">Forgot password?</Link></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>
            </div>
        </CardAnimation>
    );
};

export default UserLogin;