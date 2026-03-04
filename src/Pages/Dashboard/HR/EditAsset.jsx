import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../Hooks/Api/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import axios from "axios";
import CardAnimation from "../../../Components/Animations/CardAnimation";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Gears Lottie Animation.json";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";

const EditAsset = () => {
  const { register, handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const axiosSecure = useAxios();
  const { id } = useParams();

  const { data: assets = {}, isLoading } = useQuery({
    queryKey: ["assets", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const res = await axiosSecure.get(`/all-asset/${id}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    const imageFile = data.ProductImage[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_FILE_KEY}`,
        formData,
      )
      .then((res) => {
        const editedProduct = {
          name: data.productName,
          companyName: data.companyName,
          date: selectedDate,
          image: res.data.data.display_url,
          type: data.productType,
          quantity: data.productQuantity,
        };

        axiosSecure
          .put(`/all-asset/edit/${id}`, editedProduct)
          .then((res) => {
            if (res) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Edited",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          })
          .catch((err) => console.log(err.message));
      });
  };

  if (isLoading)
    return (
      <div className=" h-dvh flex justify-center items-center ">
        <Lottie
          style={{ width: 400, height: 400 }}
          animationData={loadingAnimation}
          loop={true}
        />
      </div>
    );

  return (
    <>
    <title>Edit-Asset | AssetVerse</title>
    <CardAnimation
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0 }}
      className="min-h-screen  md:p-4 md:shadow-xl rounded-3xl"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold  text-gray-800 mb-1">Edit Product</h1>

        <div className="bg-white  rounded-2xl ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Product Name</label>
              <Input
                type="text"
                defaultValue={assets.productName}
                name="productName"
                register={register}
                placeholder="Product Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Company Name</label>
              <Input
                type="text"
                defaultValue={assets.companyName}
                name="companyName"
                register={register}
                placeholder="Company Name"
              />
              
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Product Image</label>
              <Input
                type="file"
                name="ProductImage"
                register={register}
                placeholder="Company Name"
                className='w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all '
              />
              
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Product Type</label>
              <select
                defaultValue={assets.productType}
                {...register("productType")}
                required
                className=" select w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all "
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
                defaultValue={assets.productQuantity}
                name="productQuantity"
                register={register}
                placeholder="Quantity"
                
              />
              
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Purchase Date</label>
              <DatePicker
                showIcon
                defaultValue={assets.date}
                selected={selectedDate}
                onChange={setSelectedDate}
                className="input w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all "
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-end">
              <Button className="btn btn-neutral w-full md:w-48 mt-4">
                Edit Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </CardAnimation>
    </>
  );
};

export default EditAsset;
