import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import validation from "../../utils/validation";
import LoginRegisterInput from "../../components/UI/LoginRegisterInput";
import { useAuth } from "../../hooks/useStoreContext";
import useAxios from "../../hooks/useAxios";
import useFormState from "../../hooks/useFormState";
import Button from "../../components/UI/Button";

const Register = () => {
  const userNameRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { requestHttp } = useAxios();
  const { userNameValidation, emailValidation, passwordValidation } =
    validation();

  const { input, setInput, onChangeInputHandler } = useFormState({
    userName: "",
    userEmail: "",
    password: "",
    passwordMatch: "",
  });

  const { userName, userEmail, password, passwordMatch } = input;

  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isUserNameFocus, setIsUserNameFocus] = useState(false);

  const [isValidUserEmail, setIsValidUserEmail] = useState(false);
  const [isUserEmailFocus, setIsUserEmailFocus] = useState(false);

  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const [isValidPasswordMatch, setIsValidPasswordMatch] = useState(false);
  const [isPasswordMatchFocus, setIsPasswordMatchFocus] = useState(false);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    const userNameValid = userNameValidation.test(userName);
    const emailValid = emailValidation.test(userEmail);
    setIsValidUserName(userNameValid);
    setIsValidUserEmail(emailValid);
  }, [userName, userEmail, userNameValidation, emailValidation]);

  useEffect(() => {
    const passwordValid = passwordValidation.test(password);
    setIsValidPassword(passwordValid);
    setIsValidPasswordMatch(password === passwordMatch);
  }, [password, passwordMatch, passwordValidation]);

  const userNameFocusHandler = () => {
    setIsUserNameFocus((prevState) => !prevState);
  };

  const userEmailFocusHandler = () => {
    setIsUserEmailFocus((prevState) => !prevState);
  };

  const passwordFocusHandler = () => {
    setIsPasswordFocus((prevState) => !prevState);
  };

  const passwordMatchFocusHandler = () => {
    setIsPasswordMatchFocus((prevState) => !prevState);
  };

  const RegisterSubmitHandler = (event) => {
    event.preventDefault();

    const registerFormInput = {
      username: userName,
      email: userEmail,
      password: password,
    };

    requestHttp(
      {
        method: "POST",
        url: "/users",
        dataReq: registerFormInput,
      },
      (data) => {
        login(data?.token);
        navigate("/home", { replace: true });
      }
    );

    setInput({
      userName: "",
      userEmail: "",
      password: "",
      passwordMatch: "",
    });
  };

  return (
    <section className="m-auto flex w-full flex-col gap-y-4 p-6 md:max-w-xs">
      <h1 className="text-sm font-bold dark:text-white-bone">Sign Up</h1>
      <form onSubmit={RegisterSubmitHandler} className="flex flex-col gap-y-2">
        <LoginRegisterInput
          placeholder={"Username"}
          isValidInput={isValidUserName}
          isFocusInput={isUserNameFocus}
          name="userName"
          input={userName}
          ref={userNameRef}
          autoComplete={"off"}
          type="text"
          onChange={onChangeInputHandler}
          onFocus={userNameFocusHandler}
          onBlur={userNameFocusHandler}
        />
        <LoginRegisterInput
          placeholder={"Email"}
          isValidInput={isValidUserEmail}
          isFocusInput={isUserEmailFocus}
          name="userEmail"
          input={userEmail}
          type="email"
          onChange={onChangeInputHandler}
          onFocus={userEmailFocusHandler}
          onBlur={userEmailFocusHandler}
        />
        <LoginRegisterInput
          placeholder={"Password"}
          isValidInput={isValidPassword}
          isFocusInput={isPasswordFocus}
          name="password"
          input={password}
          type="password"
          onChange={onChangeInputHandler}
          onFocus={passwordFocusHandler}
          onBlur={passwordFocusHandler}
        />
        <LoginRegisterInput
          placeholder={"Confirm Password"}
          isValidInput={isValidPasswordMatch}
          isFocusInput={isPasswordMatchFocus}
          name="passwordMatch"
          input={passwordMatch}
          type="password"
          onChange={onChangeInputHandler}
          onFocus={passwordMatchFocusHandler}
          onBlur={passwordMatchFocusHandler}
        />

        <Button className="!bg-dark-brown py-3 text-xs font-light text-white disabled:cursor-not-allowed dark:!bg-white-bone dark:font-medium dark:text-dark-brown">
          Create Account
        </Button>
      </form>
      <p className="text-center text-sm dark:text-white-bone">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="font-semibold text-dark-brown underline dark:text-white-bone"
        >
          Log In
        </Link>
      </p>
    </section>
  );
};

export default Register;
