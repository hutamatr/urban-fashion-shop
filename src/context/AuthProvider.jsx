import React, { useReducer } from "react";
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

  const authHandler = (token) => {
    localStorage.setItem("auth_token", token);
    dispatch({ type: "AUTH", payload: token });
  };

  const unAuthHandler = () => {
    localStorage.removeItem("auth_token");
    dispatch({ type: "UN-AUTH" });
  };

  const value = {
    isAuth: authState.isAuth,
    auth: authHandler,
    unAuth: unAuthHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
