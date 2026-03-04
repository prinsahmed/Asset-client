import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form"; // Added Controller
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import regImage from "../../assets/Sign up-pana.png";
import { EyeClosed, EyeIcon, Calendar } from "lucide-react";
import { AuthContext } from "../../Context/Context";
import { useAxios } from "../../Hooks/Api/useAxios";
import CardAnimation from "../../Components/Animations/CardAnimation";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import ErrorMsg from "../../Components/Error/ErrorMessage";

const AuthEmployee = () => {
  const [viewPass, setViewPass] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateOfBirth: new Date(),
    },
  });

  const { signInEmail, setReload } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    Swal.fire({
      title: "Creating Account...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    signInEmail(data.email, data.password)
      .then((res) => {
        setReload(true);
        if (res) {
          axiosSecure.post("/user-employee", data).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Account Created!",
                timer: 1500,
                showConfirmButton: false,
              }).then(() => navigate("/dash"));
            }
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  return (
    <>
      <title>Registration-Employee | AssetVerse</title>
      <CardAnimation
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-12 px-4 min-h-screen bg-slate-50 flex items-center justify-center"
      >
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full">
          <div className="hidden md:block w-1/2">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                Unlock Your <span className="text-sky-600">Workspace</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-md mt-4">
                Join AssetVerse to track equipment, request tools, and stay
                organized.
              </p>
            </div>
            <img
              src={regImage}
              alt="Registration"
              className="w-[500px] drop-shadow-2xl"
            />
          </div>

          <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-white p-8 rounded-3xl shadow-xl">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Employee Registration
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Start managing your assets today
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-500 ml-1">
                  Full Name
                </label>
                <Input
                  name="name"
                  placeholder="User's Name"
                  register={register}
                  validation={{ required: "Name is required" }}
                />
                {errors.name && <ErrorMsg message={errors.name.message} />}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-500 ml-1">
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="avatar@company.com"
                  register={register}
                  validation={{ required: "Email is required" }}
                />
                {errors.email && <ErrorMsg message={errors.email.message} />}
              </div>

              <div className="space-y-1 relative">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={viewPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                        message: "Must include Upper, Lower, Number & Symbol",
                      },
                    })}
                    className={`w-full bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all ${errors.password ? "border-red-300 ring-1 ring-red-100" : ""}`}
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

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-500 ml-1">
                  Date of Birth
                </label>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all"
                      dateFormat="MMMM d, yyyy"
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <ErrorMsg message={errors.dateOfBirth.message} />
                )}
              </div>

              <Button>Create Account</Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-sky-600 font-bold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </CardAnimation>
    </>
  );
};

export default AuthEmployee;
