import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner, Tooltip } from "flowbite-react";

import LoginRegisterInput from "../../components/UI/LoginRegisterInput";
import ToastAlert from "../../components/UI/ToastAlert";
import validation from "../../utils/validation";
import useAxios from "../../hooks/useAxios";
import useFormState from "../../hooks/useFormState";
import { useAuth } from "../../hooks/useStoreContext";

const account = `For demo purposes, use this demo account. username : johnd, password : m38rmF$`;

const Login = () => {
  const { input, setInput, onChangeInputHandler } = useFormState({
    username: "",
    password: "",
  });

  const usernameRef = useRef();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { requestHttp, error, setError, loading } = useAxios();
  const { userNameValidation, passwordValidation } = validation();

  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const { username, password } = input;

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

    setInput({
      username: "",
      password: "",
    });
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
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold">Log In</h1>
          <Tooltip content={account} trigger="click">
            <button
              className="p-1 text-xs font-semibold ring-2 ring-dark-brown"
              type="button"
            >
              Demo Account
            </button>
          </Tooltip>
        </div>
        <form onSubmit={loginSubmitHandler} className="flex flex-col gap-y-2">
          <LoginRegisterInput
            placeholder={"Username"}
            name="username"
            input={username}
            type="text"
            ref={usernameRef}
            onChange={onChangeInputHandler}
            isValidInput={isValidUserName}
          />

          <LoginRegisterInput
            placeholder={"Password"}
            name="password"
            input={password}
            type="password"
            onChange={onChangeInputHandler}
            isValidInput={isValidPassword}
          />

          <button
            className="text flex flex-row items-center justify-center gap-x-2 bg-dark-brown py-3 font-light text-white disabled:cursor-not-allowed"
            disabled={!isValidUserName || !isValidPassword ? true : false}
            type="submit"
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
