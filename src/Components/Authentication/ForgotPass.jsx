import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';
import CardAnimation from '../Animations/CardAnimation';

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
        <CardAnimation
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
        >
            <div className=" flex justify-center items-center bg-white min-h-screen">
                <div className="rounded-lg bg-white w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className="label">Email</label>
                            <input type="email" {...register('email')} required className="input" placeholder="Email" />
                            <button className="btn btn-neutral hover:scale-105 transition-all duration-400 mt-4">Send a code</button>
                        </form>
                    </div>
                </div>
            </div>
        </CardAnimation>
    );
};

export default ForgotPass;