import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import axios from "axios";
import regImage from "../../assets/Filing system-pana.png";
import { EyeClosed, EyeIcon } from "lucide-react";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import ErrorMsg from "../../Components/Error/ErrorMessage";
import { AuthContext } from "../../Context/Context";
import { useAxios } from "../../Hooks/Api/useAxios";
import CardAnimation from "../../Components/Animations/CardAnimation";

const AuthHR = () => {
  const { signInEmail, setReload } = useContext(AuthContext);
  const [viewPass, setViewPass] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    Swal.fire({
      title: "Creating HR Profile",
      html: "Uploading logo and securing your data...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const imageFile = data.companyLogo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_FILE_KEY}`,
        formData,
      )
      .then((res) => {
        const HRData = {
          name: data.name,
          companyName: data.companyName,
          companyLogo: res.data.data.display_url,
          email: data.email,
          password: data.password,
          dateOfBirth: data.dateOfBirth,
        };

        signInEmail(data.email, data.password).then(() => {
          axiosSecure.post("/user-HR", HRData).then((res) => {
            setReload(true);
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Account Created!",
                timer: 1500,
                showConfirmButton: false,
              }).then(() => navigate("/dash"));
            }
          });
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.message,
        });
      });
  };

  return (
    <>
      <title>Registration-HR | AssetVerse</title>
      <CardAnimation
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-12 px-4 min-h-screen bg-base-100 text-base-content  flex items-center justify-center"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl w-full">
          <div className="hidden lg:block w-1/2">
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                Manage your <span className="text-sky-600">Enterprise.</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-md">
                Register as HR to oversee assets, manage employees, and
                streamline your company's workflow.
              </p>
              <img
                className="w-full max-w-lg drop-shadow-2xl"
                src={regImage}
                alt="HR Management"
              />
            </div>
          </div>

          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-2xl border border-white shadow-xl rounded-3xl p-8 md:p-12">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">
                HR Registration
              </h2>
              <p className="text-gray-500 mt-2">
                Setup your company dashboard in minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    placeholder="User's Name"
                    register={register}
                    validation={{ required: "Name is required" }}
                    className={`${errors.name ? "border-red-300 ring-1 ring-red-100" : ""}`}
                  />
                  {errors.name && <ErrorMsg message={errors.name.message} />}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    Company Name
                  </label>
                  <Input
                    name="companyName"
                    placeholder="BSRM"
                    register={register}
                    validation={{ required: "Company name is required" }}
                    className={` ${errors.companyName ? "border-red-300 ring-1 ring-red-100" : ""}`}
                  />
                  {errors.companyName && (
                    <ErrorMsg message={errors.companyName.message} />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Company Logo
                </label>
                <Input
                  type="file"
                  name="companyLogo"
                  register={register}
                  validation={{ required: "Logo is required" }}
                  className={` ${errors.companyLogo ? "border-red-300" : ""}`}
                />
                {errors.companyLogo && (
                  <ErrorMsg message={errors.companyLogo.message} />
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Work Email
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="avatar@company.com"
                  register={register}
                  validation={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  }}
                  className={` ${errors.email ? "border-red-300 ring-1 ring-red-100" : ""}`}
                />
                {errors.email && <ErrorMsg message={errors.email.message} />}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      className={`w-full bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-2 focus:ring-sky-500 outline-none duration-300 transition-all ${errors.password ? "border-red-300 ring-1 ring-red-100" : ""}`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setViewPass(!viewPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-600 transition-colors"
                    >
                      {viewPass ? (
                        <EyeIcon size={18} />
                      ) : (
                        <EyeClosed size={18} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <ErrorMsg message={errors.password.message} />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 block">
                    Date of Birth
                  </label>
                  <Controller
                    control={control}
                    name="dateOfBirth"
                    rules={{ required: "Birth date is required" }}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        className={`w-full bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-2 focus:ring-sky-500 outline-none duration-300 transition-all ${errors.dateOfBirth ? "border-red-300 ring-1 ring-red-100" : ""}`}
                        placeholderText="Select Date"
                      />
                    )}
                  />
                  {errors.dateOfBirth && (
                    <ErrorMsg message={errors.dateOfBirth.message} />
                  )}
                </div>
              </div>

              <Button>Create Account</Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
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

export default AuthHR;
