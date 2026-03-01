import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/Context";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../Hooks/Api/useAxios";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Input from "../../../Components/Input/Input";

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
          `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_FILE_KEY}`,
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
                  title: "Successfully registered",
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
          if (res.data.modifiedCount) {
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
    <CardAnimation
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0 }}
      className="min-h-screen  p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
          <p className="text-gray-500">
            Update your personal and professional information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Static Identity Card */}
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

          {/* Right Column: Full Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal & Work Information Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">
                  Profile Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
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

                  {/* Email (Read Only) */}
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
                      className="input focus:outline-sky-500 focus:border-none focus:duration-80  cursor-not-allowed w-full"
                    />
                  </div>

                  {/* Date of Birth (Now Editable) */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-600">
                        Date of Birth
                      </span>
                    </label>
                    <DatePicker
                      defaultValue={userData.dateOfBirth}
                      className="input focus:outline-sky-500 focus:border-none focus:duration-80   w-[250px]"
                      showIcon
                      selected={selectedDate}
                      onChange={setSelectedDate}
                    />
                  </div>

                  {/* Phone */}
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

                  {/* Location */}
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
                  {/* image */}
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
                        className="file-input file-input-bordered file-input-info"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t flex justify-end">
                  <button className="btn btn-primary px-10 rounded-xl shadow-lg shadow-blue-200">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CardAnimation>
  );
};

export default MyProfileHR;
