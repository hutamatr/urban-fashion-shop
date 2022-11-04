import React from "react";

const Button = ({ children, className, type, onClick, disabled }) => {
  return (
    <button
      className={`border border-dark-brown bg-white-bone uppercase ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
