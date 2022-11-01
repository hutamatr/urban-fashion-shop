import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../components/UI/FormInput";
import validation from "../utils/validation";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useStoreContext";

const Login = () => {
  const usernameRef = useRef();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { requestHttp } = useAxios();
  const { userNameValidation, passwordValidation } = validation();

  const [username, setUsername] = useState("");
  const [isValidUserName, setIsValidUserName] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  useEffect(() => {
    const usernameValid = userNameValidation.test(username);
    const passwordValid = passwordValidation.test(password);
    setIsValidUserName(usernameValid);
    setIsValidPassword(passwordValid);
  }, [username, password, userNameValidation, passwordValidation]);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const usernameInputHandler = (event) => setUsername(event.target.value);
  const passwordInputHandler = (event) => setPassword(event.target.value);

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const loginInput = {
      username,
      password,
    };

    requestHttp(
      {
        method: "POST",
        url: "auth/login",
        dataReq: loginInput,
      },
      (data) => {
        auth(data?.token);
        console.log(data);
        navigate("/", { replace: true });
      }
    );

    setUsername("");
    setPassword("");
  };

  return (
    <section className="m-auto flex w-full flex-col gap-y-4 p-6 md:max-w-xs">
      <h1 className="text-sm font-bold">Log In</h1>
      <form onSubmit={loginSubmitHandler} className="flex flex-col gap-y-2">
        <FormInput
          placeholder={"Username"}
          input={username}
          type="text"
          ref={usernameRef}
          onChange={usernameInputHandler}
          isValidInput={isValidUserName}
        />
        <FormInput
          placeholder={"Password"}
          input={password}
          type="password"
          onChange={passwordInputHandler}
          isValidInput={isValidPassword}
        />

        <button
          className="bg-dark-brown py-3 text-xs font-light text-white disabled:cursor-not-allowed"
          disabled={!isValidUserName || !isValidPassword ? true : false}
        >
          Log In
        </button>
      </form>
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          to={"/register"}
          className="font-semibold text-dark-brown underline"
        >
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;
