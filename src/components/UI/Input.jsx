import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type,
      id,
      className,
      name,
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      autoComplete,
      required,
    },
    ref
  ) => {
    return (
      <input
        type={type}
        id={id}
        className={className}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        autoComplete={autoComplete}
        required={required}
      />
    );
  }
);

export default Input;
