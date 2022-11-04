import React, { useReducer, useEffect, useState } from "react";
import jwt from "jwt-decode";
import { AuthContext } from "./Context";

const initState = {
  isAuth: false,
  auth_token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH":
      return {
        isAuth: true,
        auth_token: action.payload,
      };

    case "UN-AUTH":
      return {
        isAuth: false,
        auth_token: null,
      };

    default:
      return initState;
  }
};

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initState);
  const [authSuccess, setAuthSuccess] = useState({
    isSuccess: false,
    successMessage: "",
  });
  const [unAuthSuccess, setUnAuthSuccess] = useState({
    isSuccess: false,
    successMessage: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      dispatch({ type: "AUTH", payload: token });
    }
  }, []);

  const authHandler = (token, successMessage) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("decode", JSON.stringify(jwt(token)));
    dispatch({ type: "AUTH", payload: token });
    setAuthSuccess({
      isSuccess: !!token,
      successMessage: successMessage,
    });
  };

  const unAuthHandler = (isUnAuth, successMessage) => {
    localStorage.removeItem("auth_token");
    dispatch({ type: "UN-AUTH" });
    setUnAuthSuccess({
      isSuccess: isUnAuth,
      successMessage,
    });
  };

  const value = {
    authSuccess,
    setAuthSuccess,
    unAuthSuccess,
    setUnAuthSuccess,
    isAuth: authState.isAuth,
    auth: authHandler,
    unAuth: unAuthHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
