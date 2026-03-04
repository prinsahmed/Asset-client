import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { AuthContext } from "../../Context/Context";
import CardAnimation from "../../Components/Animations/CardAnimation";

const ForgotPass = () => {
  const { register, handleSubmit } = useForm();
  const { passResetEmail } = useContext(AuthContext);

  function onSubmit(data) {
    passResetEmail(data.email).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Code has been sent",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  return (
    <>
      <title>Forget-Password | AssetVerse</title>
      <CardAnimation
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className=" flex justify-center items-center min-h-screen px-4">
          <div className=" bg-white/90 backdrop-blur-2xl border border-white shadow-xl rounded-3xl">
            <div className="card-body">
              <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <label className="label">Email</label>
                <Input
                  type="email"
                  name="email"
                  register={register}
                  placeholder="Email"
                />

                <Button>Send Code</Button>
              </form>
            </div>
          </div>
        </div>
      </CardAnimation>
    </>
  );
};

export default ForgotPass;
