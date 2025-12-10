import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../Firebase/firebase';
import Swal from 'sweetalert2';

const UserLogin = () => {

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
                }
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div className='flex justify-center items-center h-dvh'>
            <form onSubmit={handleSubmit(onSubmit)} >

                <fieldset className="fieldset  border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Login</legend>

                    <label className="label">Email</label>
                    <input type="email" {...register('email')} className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" {...register('password')} className="input" placeholder="Password" />

                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </form>
        </div>
    );
};

export default UserLogin;