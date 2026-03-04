import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/Context";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../Hooks/Api/useAxios";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";

const MyProfileHR = () => {
  const { userData, user } = useContext(AuthContext);
  const [isImage, setIsImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    userData?.dateOfBirth ? new Date(userData.dateOfBirth) : new Date(),
  );
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxios();

  function onSubmit(data) {
    const imageFile = data.userPhoto?.[0] || null;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_FILE_KEY}`,
          formData,
        )
        .then((res) => {
          const UserData = {
            name: data.name,
            userImage: res.data.data.display_url,
            phoneNumber: data.phoneNumber,
            location: data.location,
            dateOfBirth: selectedDate,
          };
          axiosSecure
            .post(`/profile-update?email=${user?.email}`, UserData)
            .then((res) => {
              if (res.data.modifiedCount === 1) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Successfully Updated",
                  showConfirmButton: false,
                  timer: 1000,
                });
              }
            });
        })
        .catch((err) => console.log(err.message));
    } else {
      const UserData = {
        name: data.name,
        userImage: userData.image,
        phoneNumber: data.phoneNumber,
        location: data.location,
        dateOfBirth: selectedDate,
      };
      axiosSecure
        .post(`/profile-update?email=${user?.email}`, UserData)
        .then((res) => {
          if (res.data.modifiedCount === 1) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully Updated",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        })
        .catch((err) => console.log(err.message));
    }
  }

  return (
    <>
      <title>Profile | AssetVerse</title>
      <CardAnimation
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
        className="min-h-screen  p-4 md:p-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
            <p className="text-gray-500">
              Update your personal and professional information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ">
                <div className="text-center">
                  <div className="relative inline-block ">
                    <img
                      src={userData?.userImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4  border-blue-50 object-cover mx-auto"
                    />
                    <span className="absolute bottom-2 right-2 bg-green-500 border-2 border-white w-5 h-5 rounded-full"></span>
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-center text-gray-800">
                  {userData?.name}
                </h2>
                <p className="text-blue-600 font-medium text-center mb-2 text-sm capitalize">
                  {userData?.role || "HR Manager"}
                </p>

                <p className=" text-gray-400 text-sm capitalize">
                  Company: {userData.companyName}
                </p>
                <p className=" text-gray-400 text-sm capitalize">
                  Package Limit: {userData.packageLimit}
                </p>
                <p className=" text-gray-400 text-sm capitalize">
                  Employees: {userData.currentEmployees}
                </p>

                <button
                  onClick={() => setIsImage(true)}
                  className="w-full mt-6 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-xl transition-all font-semibold"
                >
                  Change Photo
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">
                    Profile Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold text-gray-600">
                          Full Name
                        </span>
                      </label>
                      <Input
                        type="text"
                        defaultValue={userData?.name}
                        name="name"
                        register={register}
                        placeholder="Name"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold text-gray-600">
                          Email Address
                        </span>
                      </label>

                      <input
                        type="email"
                        defaultValue={userData?.email}
                        disabled
                        className="w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold text-gray-600">
                          Date of Birth
                        </span>
                      </label>
                      <DatePicker
                        defaultValue={userData.dateOfBirth}
                        className="focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all   w-[250px]"
                        showIcon
                        selected={selectedDate}
                        onChange={setSelectedDate}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold text-gray-600">
                          Phone Number
                        </span>
                      </label>
                      <Input
                        type="text"
                        defaultValue={userData?.phoneNumber}
                        name="phoneNumber"
                        register={register}
                        placeholder="+880"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold text-gray-600">
                          Location
                        </span>
                      </label>
                      <Input
                        type="text"
                        defaultValue={userData?.location}
                        name="location"
                        register={register}
                        placeholder="City, Country"
                      />
                    </div>

                    {isImage && (
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-bold text-gray-600">
                            Image
                          </span>
                        </label>
                        <Input
                          type="file"
                          name="userPhoto"
                          register={register}
                          className="w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all "
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-10 pt-6 border-t flex justify-end">
                    <Button className="btn btn-primary px-10 rounded-xl shadow-lg shadow-blue-200">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </CardAnimation>
    </>
  );
};

export default MyProfileHR;
