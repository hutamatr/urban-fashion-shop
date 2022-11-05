import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

import FormInput from "../components/UI/FormInput";
import ToastAlert from "../components/UI/ToastAlert";
import validation from "../utils/validation";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useStoreContext";

const Login = () => {
  const usernameRef = useRef();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { requestHttp, error, setError, loading } = useAxios();
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        const expireDateLogin = new Date(new Date().getTime() + 86400 * 1000);
        auth(data?.token, "Login Successfully", expireDateLogin.toISOString());
        navigate("/", { replace: true });
      }
    );

    setUsername("");
    setPassword("");
  };

  return (
    <>
      {error.isError && (
        <ToastAlert
          children={error.errorMessage}
          onError={error.isError}
          onSetError={setError}
          icons={"error"}
        />
      )}
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
            className="text flex flex-row items-center justify-center gap-x-2 bg-dark-brown py-3 font-light text-white disabled:cursor-not-allowed"
            disabled={!isValidUserName || !isValidPassword ? true : false}
          >
            {loading.isLoading && <Spinner />}

            {loading.isLoading ? loading.loadingMessage : "Login"}
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
    </>
  );
};

export default Login;
