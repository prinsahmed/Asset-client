import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";
import { useAxios } from "../../Hooks/Api/useAxios";
import axios from "axios";
import CardAnimation from "../Animations/CardAnimation";
import regImage from "../../assets/Filing system-pana.png";
import { EyeClosed, EyeIcon } from "lucide-react";
import Input from "../Input/Input";
import Button from "../Button/Button";

const AuthHR = () => {
  const { signInEmail } = useContext(AuthContext);
  const [viewPass, setViewPass] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

    const imageFile = data.companyLogo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    axios
      .post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_FILE_KEY}`,
        formData,
      )
      .then((res) => {
        const HRData = {
          name: data.name,
          companyName: data.companyName,
          companyLogo: res.data.data.display_url,
          email: data.email,
          password: data.password,
          dateOfBirth: selectedDate,
        };

        signInEmail(data.email, data.password).then(() => {
          axiosSecure.post("/user-HR", HRData).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Successfully registered",
                showConfirmButton: false,
                timer: 1000,
              }).then(() => navigate("/dash"));
            }
          });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
          confirmButtonColor: "#4f46e5",
        });
      });
  }
  return (
    <CardAnimation
      className='pt-12 min-h-screen"'
      initial={{ opacity: 0, y: -15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="hero">
        <div className="flex items-center gap-x-16 py-12 justify-center ">
          <div className="hidden md:block">
            <img className="w-[41rem]" src={regImage} alt="Filing system-pan" />
          </div>
          <div className="h-80 w-[1px] bg-gray-300 hidden md:block"></div>
          <div className="card bg-gradient-to-br from-black/20 to-white/20 backdrop-blur-xl w-full max-w-sm shrink-0 ">
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

                  <label className="label">Company Name</label>
                  <Input
                    type="text"
                    name="companyName"
                    placeholder="Company name"
                    register={register}
                  />

                  <label className="label">Company Logo</label>
                  <Input
                    type="file"
                    name="companyLogo"
                    placeholder="Company logo"
                    register={register}
                    className="file-input file-input-info"
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
                      className="input  focus:outline-sky-500 focus:border-none focus:duration-80"
                      placeholder="Password"
                    />
                    <div
                      onClick={() => setViewPass(!viewPass)}
                      className="absolute z-50 top-2.5 right-7"
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
                    className=" focus:outline-sky-500 focus:border-none focus:duration-80"
                    showIcon
                    selected={selectedDate}
                    onChange={setSelectedDate}
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

export default AuthHR;
