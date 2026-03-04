import React from "react";

const Button = ({ children, onClick, className}) => {
  return (
    <button onClick={onClick} className={`w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-sky-100 transition-all transform hover:-translate-y-1 active:scale-95 mt-4${className}`}>
      {children}
    </button>
  );
};

export default Button;
