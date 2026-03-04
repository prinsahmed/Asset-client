import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  register,
  className,
  defaultValue,
}) => {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      {...(register ? register(name) : {})}
      required
      className={` w-full focus:border-none duration-300  bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-3 focus:ring-sky-500 outline-none transition-all ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
