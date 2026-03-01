import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/Context";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAxios } from "../../Hooks/Api/useAxios";
import CardAnimation from "../Animations/CardAnimation";
import regImage from "../../assets/Sign up-pana.png";
import { EyeClosed, EyeIcon } from "lucide-react";
import Input from "../Input/Input";
import Button from "../Button/Button";

const AuthEmployee = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewPass, setViewPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInEmail } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  function onSubmit(data) {
    Swal.fire({
      title: "Processing",
      html: "Storing your data, please wait.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const EmplyeeData = {
      name: data.name,
      email: data.email,
      password: data.password,
      dateOfBirth: selectedDate,
    };

    signInEmail(data.email, data.password)
      .then((res) => {
        if (res) {
          axiosSecure.post("/user-employee", EmplyeeData).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Successfully registered",
                showConfirmButton: false,
                timer: 1000,
              }).then(() => navigate("/dash"));
            }
          });
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
      className="pt-24 px-4 md:pt-12 min-h-screen"
      initial={{ opacity: 0, y: -15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className=" flex items-center gap-x-16 justify-center ">
          <div className="hidden md:block">
            <img
              className="max-w-[39rem]  "
              src={regImage}
              alt="Sign up-pana"
            />
          </div>
          <div className="h-80 w-[1px] hidden md:block bg-gray-300"></div>

          <div className="card bg-gradient-to-br from-black/20 to-white/20 backdrop-blur-xl w-full max-w-sm shrink-0  ">
            <div className="card-body">
              <h2 className="text-2xl  text-center font-bold">Sign Up</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset space-y-1">
                  <label className="label">Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    register={register}
                  />

                  <label className="label">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    register={register}
                  />

                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={viewPass ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                          message:
                            "Must have lowercase, uppercase, number and minimum 6 characters",
                        },
                      })}
                      className="input w-full focus:outline-sky-500 focus:border-none focus:duration-80"
                      placeholder="Password"
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
                  <p className="text-red-500">{errors.password?.message}</p>

                  <label className="label mt-2">Date of Birth</label>
                  <DatePicker
                    showIcon
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    className="focus:outline-sky-500 focus:border-none focus:duration-80"
                  />
                  <Button>Register</Button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </CardAnimation>
  );
};

export default AuthEmployee;
