import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../Firebase/firebase";
import Swal from "sweetalert2";
import CardAnimation from "../Animations/CardAnimation";
import regImage from "../../assets/Computer login-bro.png";
import { Link, useNavigate } from "react-router";
import { EyeClosed, EyeIcon } from "lucide-react";
import Input from "../Input/Input";

const UserLogin = () => {
  const navigate = useNavigate();
  const [viewPass, setViewPass] = useState(false);
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
          }).then(() => {
            navigate("/dash");
          });
        }
      })
      .catch((error) => {
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
      className="min-h-screen py-12"
    >
      <div className="flex items-center gap-x-16 pt-12 justify-center ">
        <div className="hidden md:block">
          <img
            className="w-[36rem]"
            src={regImage}
            alt="Computer login-rafiki"
          />
        </div>
        <div className="h-60 w-[0.5px] bg-gray-300 hidden md:block"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset space-y-1 bg-gradient-to-br from-black/20 to-white/20 backdrop-blur-xl rounded-lg w-xs  p-6">
            <h2 className="text-2xl  text-center font-bold">Login</h2>
            <label className="label">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              register={register}
            />

            <label className="label">Password</label>
            <div className="relative">
              <Input
                type={viewPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                register={register}
              />
              <div
                onClick={() => setViewPass(!viewPass)}
                className="absolute z-50 top-2.5 right-3"
              >
                {viewPass ? (
                  <span>
                    <EyeIcon />
                  </span>
                ) : (
                  <span>
                    <EyeClosed />
                  </span>
                )}
              </div>
            </div>
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
