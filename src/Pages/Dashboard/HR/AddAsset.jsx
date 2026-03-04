import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../Hooks/Api/useAxios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../Context/Context";
import axios from "axios";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";

const AddAsset = () => {
  const { register, handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);

  function onSubmit(data) {
    const imageFile = data.ProductImage[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_FILE_KEY}`,
        formData,
      )
      .then((res) => {
        const addedProduct = {
          productName: data.productName,
          companyName: data.companyName,
          hrEmail: user?.email,
          date: selectedDate,
          productImage: res.data.data.display_url,
          productType: data.productType,
          productQuantity: parseInt(data.productQuantity),
        };

        axiosSecure
          .post("/add-product", addedProduct)
          .catch((err) => console.log(err.message));

        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Added",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <title>Add-Asset | AssetVerse</title>
      <CardAnimation
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
        className="min-h-screen pt-6 lg:px-6 rounded-3xl md:shadow-xl"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-1 text-gray-800">
            Add New Product
          </h1>

          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Product Name</label>
                <Input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  register={register}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Company Name</label>
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  register={register}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Product Image</label>
                <Input
                  type="file"
                  name="ProductImage"
                  register={register}
                  required
                  className="w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Product Type</label>
                <select
                  defaultValue="Product Type"
                  {...register("productType")}
                  required
                  className="select w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all "
                >
                  <option disabled>Product Type</option>
                  <option>Returnable</option>
                  <option>Non Returnable</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Product Quantity</label>
                <Input
                  type="number"
                  name="productQuantity"
                  register={register}
                  placeholder="Quantity"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Purchase Date</label>
                <DatePicker
                  showIcon
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  className="w-full bg-white border border-gray-200 rounded-2xl  px-4 focus:ring-3 focus:ring-sky-500 outline-none duration-300 transition-all"
                  placeholderText="Select Date"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">HR Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  {...register("email")}
                  required
                  className="w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Email"
                />
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-end">
                <Button className="btn btn-neutral w-full md:w-48 mt-4">
                  Add Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardAnimation>
    </>
  );
};

export default AddAsset;
