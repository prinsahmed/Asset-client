import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../Firebase/firebase";
import Swal from "sweetalert2";
import CardAnimation from "../Animations/CardAnimation";
import regImage from "../../assets/Computer login-bro.png";
import { Link, useNavigate } from "react-router";

const UserLogin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    Swal.fire({
      title: "Authenticating...",
      html: "Checking your credentials, please wait.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Successfully logged in",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dash");
        }
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          confirmButtonColor: "#4f46e5",
        });
      });
  }

  return (
    <CardAnimation
      initial={{ opacity: 0, y: -15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <div className="flex items-center gap-x-16 pt-12 justify-center ">
        <div>
          <img
            className="w-[36rem]"
            src={regImage}
            alt="Computer login-rafiki"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-white rounded-lg w-xs  p-6">
            <h2 className="text-2xl text-[#90CAF9] text-center font-bold">
              Login
            </h2>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input focus:outline-sky-500 focus:border-none focus:duration-80"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password")}
              className="input focus:outline-sky-500 focus:border-none focus:duration-80"
              placeholder="Password"
            />
            <div>
              <Link to="/auth/forget-pass" className="link link-hover">
                Forgot password?
              </Link>
            </div>
            <button className="btn btn-neutral hover:scale-105 transition-all duration-400 mt-4">
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </CardAnimation>
  );
};

export default UserLogin;
