import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";
import CardAnimation from "../Animations/CardAnimation";
import Button from "../Button/Button";
import Input from "../Input/Input";

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
    <CardAnimation
      initial={{ opacity: 0, y: -15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className=" flex justify-center items-center min-h-screen px-4">
        <div className="rounded-lg bg-gradient-to-br from-black/20 to-white/20 backdrop-blur-xl w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export default ForgotPass;
