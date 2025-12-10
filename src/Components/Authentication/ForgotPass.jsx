import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';

const ForgotPass = () => {

    const { register, handleSubmit } = useForm();
    const { passResetEmail } = useContext(AuthContext);


    function onSubmit(data) {
        passResetEmail(data.email)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Code has been sent",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }

    return (
        <div>
            <div className="hero  min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className="label">Email</label>
                                <input type="email" {...register('email')} required className="input" placeholder="Email" />
                                <button className="btn btn-neutral mt-4">Send a code</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;