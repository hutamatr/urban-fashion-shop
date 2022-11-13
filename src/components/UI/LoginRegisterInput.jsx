import React, { forwardRef, useState } from "react";

import { MdDone, MdRemoveRedEye, MdOutlineRemoveRedEye } from "react-icons/md";

import RegisterNote from "../Register/RegisterNote";
import Input from "./Input";

const LoginRegisterInput = forwardRef(
  (
    {
      id,
      placeholder,
      isValidInput,
      autoComplete,
      input,
      name,
      type,
      onChange,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const [isPassView, setIsPassView] = useState(false);

    const viewPasswordHandler = () => setIsPassView((prevState) => !prevState);

    return (
      <>
        <div
          className={`flex flex-row items-center justify-between border-2 border-dark-brown bg-white-bone`}
        >
          <Input
            required={true}
            type={isPassView ? "text" : type}
            name={name}
            id={id}
            value={input}
            autoComplete={autoComplete ? autoComplete : null}
            ref={ref}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full border-none bg-white-bone p-2 text-sm font-medium outline-none placeholder:text-sm focus:ring-0 `}
          />
          {isValidInput && input && placeholder !== "Password" && (
            <MdDone className="mr-2 w-max text-green-500" />
          )}
          {type === "password" &&
            placeholder !== "Confirm Password" &&
            input && (
              <>
                {isPassView ? (
                  <MdRemoveRedEye
                    className="mr-2 cursor-pointer"
                    onClick={viewPasswordHandler}
                    fill="#5B5B60"
                  />
                ) : (
                  <MdOutlineRemoveRedEye
                    className="mr-2 cursor-pointer"
                    onClick={viewPasswordHandler}
                    fill="#5B5B60"
                  />
                )}
              </>
            )}
        </div>
        <RegisterNote placeholder={placeholder} />
      </>
    );
  }
);

export default LoginRegisterInput;
