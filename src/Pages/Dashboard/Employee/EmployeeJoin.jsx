import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../Hooks/Api/useAxios";
import { AuthContext } from "../../../Context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";

const EmployeeJoin = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);

  function onSubmit(data) {
    const imageFile = data.userImage[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_FILE_KEY}`,
        formData,
      )
      .then((res) => {
        const userData = {
          employeeName: data.employeeName,
          employeeEmail: user?.email,
          hrEmail: data.HrEmail,
          affiliationDate: new Date(),
          approvalDate: null,
          employeeImage: res.data.data.display_url,
          status: "pending",
        };

        axiosSecure
          .post("/employee-join", userData)
          .catch((err) => console.log(err.message));

        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Requested",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <title>Join-Team | AssetVerse</title>
      <CardAnimation
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
        className="min-h-screen  p-4 rounded-3xl md:shadow-xl"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-1 text-gray-800">
            Join a Company
          </h1>

          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Name</label>
                <Input
                  type="text"
                  name="employeeName"
                  register={register}
                  placeholder="Name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Email"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Image</label>
                <Input
                  type="file"
                  name="userImage"
                  register={register}
                  placeholder="Email"
                  className="w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all "
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">HR Email</label>
                <Input
                  type="email"
                  name="HrEmail"
                  register={register}
                  placeholder="Email"
                />
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-end">
                <Button className="btn btn-neutral w-full md:w-48 mt-4">
                  Request to Join
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardAnimation>
    </>
  );
};

export default EmployeeJoin;
