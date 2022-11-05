import React, { useReducer, useEffect, useState, useCallback } from "react";
import jwt from "jwt-decode";
import { AuthContext } from "./Context";

const calculateAutoLogoutTime = (expireDate) => {
  const currentTimeInMilliseconds = new Date().getTime();
  const expireTimeInMilliseconds = new Date(expireDate).getTime();

  const remainingAutoLogoutTime =
    expireTimeInMilliseconds - currentTimeInMilliseconds;

  return remainingAutoLogoutTime;
};

const getStorageItems = () => {
  const authToken = localStorage.getItem("auth_token");
  const expireToken = localStorage.getItem("exp_token");

  const remainingTime = calculateAutoLogoutTime(expireToken);

  if (remainingTime <= 5000) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("exp_token");
    return null;
  }
  return {
    authToken,
    remainingTime,
  };
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
      const localStorageToken = getStorageItems();
      return {
        isAuth: !!localStorageToken.authToken,
        auth_token: localStorageToken.authToken,
      };
  }
};

let logoutTimer;

const AuthProvider = ({ children }) => {
  const storageData = getStorageItems();
  let localStorageToken;
  if (storageData) localStorageToken = storageData.authToken;
  const [authState, dispatch] = useReducer(authReducer, {
    isAuth: !!localStorageToken,
    auth_token: localStorageToken,
  });

  const [authSuccess, setAuthSuccess] = useState({
    isSuccess: false,
    successMessage: "",
  });

  const [unAuthSuccess, setUnAuthSuccess] = useState({
    isSuccess: false,
    successMessage: "",
  });

  const unAuthHandler = useCallback((isUnAuth, successMessage) => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("exp_token");
    dispatch({ type: "UN-AUTH" });
    if (isUnAuth) {
      setUnAuthSuccess({
        isSuccess: isUnAuth,
        successMessage,
      });
    }

    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const authHandler = (token, successMessage, expireAuth) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("decode", JSON.stringify(jwt(token)));
    localStorage.setItem("exp_token", expireAuth);
    dispatch({ type: "AUTH", payload: token });
    setAuthSuccess({
      isSuccess: !!token,
      successMessage: successMessage,
    });

    const autoLogout = calculateAutoLogoutTime(expireAuth);
    logoutTimer = setTimeout(unAuthHandler, autoLogout);
  };

  useEffect(() => {
    if (storageData) {
      logoutTimer = setTimeout(unAuthHandler, storageData.remainingTime);
    }
  }, [unAuthHandler, storageData]);

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
