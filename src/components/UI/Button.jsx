import React from "react";

const Button = ({ children, className, type, onClick }) => {
  return (
    <button
      className={`border border-dark-brown bg-white-bone uppercase ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
