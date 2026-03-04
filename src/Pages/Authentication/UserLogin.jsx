import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../Firebase/firebase";
import Swal from "sweetalert2";
import regImage from "../../assets/Computer login-bro.png";
import { Link, useNavigate } from "react-router";
import { EyeClosed, EyeIcon, LockKeyhole, Mail } from "lucide-react";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import ErrorMsg from "../../Components/Error/ErrorMessage";
import CardAnimation from "../../Components/Animations/CardAnimation";


const UserLogin = () => {
  const navigate = useNavigate();
  const [viewPass, setViewPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Authenticating...",
      html: "Checking your credentials, please wait.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Welcome Back!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => navigate("/dash"));
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
          confirmButtonColor: "#0284c7",
        });
      });
  };

  return (
    <>
    <title>Login | AssetVerse</title>
    <CardAnimation
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 pt-24"
    >
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
        <div className="hidden md:block w-full max-w-md lg:max-w-lg">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
              Hello <span className="text-sky-600">Again!</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-md pt-4">
              Ready to manage your workspace? Sign in to continue.
            </p>
          </div>
          <img
            className="w-full h-auto drop-shadow-2xl animate-float"
            src={regImage}
            alt="Secure Login"
          />
        </div>

        <div className="w-full max-w-md ">
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-2xl border border-white shadow-xl rounded-3xl p-8 md:p-12">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                Login
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1">
                  <Mail size={12} /> Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="avatar@company.com"
                  register={register}
                  validation={{ required: "Email is required" }}
                  className={`${errors.email ? "border-red-300" : ""}`}
                />
                {errors.email && <ErrorMsg message={errors.email.message} />}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                    <LockKeyhole size={12} /> Password
                  </label>
                  <Link
                    to="/auth/forget-pass"
                    className="text-[11px] font-bold text-sky-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={viewPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={`w-full bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-2 focus:ring-sky-500 outline-none transition-all pr-12 ${errors.password ? "border-red-300" : ""}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setViewPass(!viewPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-600 transition-colors"
                  >
                    {viewPass ? <EyeIcon size={18} /> : <EyeClosed size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <ErrorMsg message={errors.password.message} />
                )}
              </div>

              <div className="pt-2">
                <Button>Log in</Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/auth/employee-registration"
                  className="text-sky-600 font-bold hover:underline"
                >
                  Join as Employee
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardAnimation>
    </>
  );
};

export default UserLogin;
