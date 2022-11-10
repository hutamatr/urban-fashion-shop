import React from "react";
import Select from "react-select";

const SelectItems = ({
  options,
  value,
  onChange,
  className,
  placeholder,
  name,
}) => {
  const colourStyles = {
    menuList: (styles) => ({
      ...styles,
      background: "#E6E1DC",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: isFocused ? "#E6E1DC" : isSelected ? "#E6E1DC" : undefined,
      background: isFocused ? "#3F362F" : isSelected ? "#3F362F" : undefined,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
    control: (base, state) => ({
      ...base,
      background: "#E6E1DC",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      boxShadow: state.isFocused ? null : null,
    }),
  };

  return (
    <Select
      name={name}
      type="text"
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      styles={colourStyles}
    />
  );
};

export default SelectItems;
