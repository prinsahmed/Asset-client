import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../Hooks/Api/useAxios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../Context/Context";
import axios from "axios";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Input from "../../../Components/Input/Input";

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
        `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_FILE_KEY}`,
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
    <CardAnimation
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0 }}
      className="min-h-screen pt-6 lg:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-1 text-gray-800">
          Add New Product
        </h1>

        <div className="bg-white  rounded-lg">
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
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Company Name</label>
              <Input
                type="text"
                name="companyName"
                placeholder="Company Name"
                register={register}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Product Image</label>
              <Input
                type="file"
                name="ProductImage"
                register={register}
                className="file-input file-input-bordered file-input-info w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Product Type</label>
              <select
                defaultValue="Product Type"
                {...register("productType")}
                required
                className="select select-bordered select-info w-full"
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
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Purchase Date</label>
              <DatePicker
                showIcon
                selected={selectedDate}
                onChange={setSelectedDate}
                className="input focus:outline-sky-500 focus:border-none focus:duration-80 w-full"
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
                className="input focus:outline-sky-500 focus:border-none focus:duration-80 w-full"
                placeholder="Email"
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button className="btn btn-neutral w-full md:w-48 mt-4">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </CardAnimation>
  );
};

export default AddAsset;
