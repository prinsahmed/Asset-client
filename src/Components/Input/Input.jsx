import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  register,
  className,
  defaultValue,
  disabled
}) => {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      {...disabled}
      {...(register ? register(name) : {})}
      required
      className={`input w-full focus:outline-sky-500 focus:border-none focus:duration-80 ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
