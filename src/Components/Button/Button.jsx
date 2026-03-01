import React from "react";

const Button = ({ children, onClick, className}) => {
  return (
    <button onClick={onClick} className={`btn btn-neutral hover:scale-105 transition-all duration-400 my-1 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
