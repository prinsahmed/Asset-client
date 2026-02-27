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

const AuthEmployee = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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
            console.log(res);
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Successfully registered",
                showConfirmButton: false,
                timer: 1000,
              });
              navigate("/dash");
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
      className="pt-12 min-h-screen"
      initial={{ opacity: 0, y: -15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className=" flex items-center gap-x-16 justify-center ">
          <div>
            <img className="w-[39rem]" src={regImage} alt="Sign up-pana" />
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
            <div className="card-body">
              <h2 className="text-2xl text-[#90CAF9] text-center font-bold">
                Registration
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    required
                    className="input focus:outline-sky-500 focus:border-none focus:duration-80"
                    placeholder="Name"
                  />

                  <label className="label">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    required
                    className="input focus:outline-sky-500 focus:border-none focus:duration-80"
                    placeholder="Email"
                  />

                  <label className="label">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                        message:
                          "Must have lowercase, uppercase, number and minimum 6 characters",
                      },
                    })}
                    className="input focus:outline-sky-500 focus:border-none focus:duration-80"
                    placeholder="Password"
                  />
                  <p className="text-red-500">{errors.password?.message}</p>

                  <label className="label mt-2">Date of Birth</label>
                  <DatePicker
                    showIcon
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    className="focus:outline-sky-500 focus:border-none focus:duration-80"
                  />
                  <button className="btn btn-neutral hover:scale-105 transition-all duration-400 mt-4">
                    Register
                  </button>
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
