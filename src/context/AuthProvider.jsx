import React, { useReducer } from "react";
import { AuthContext } from "./Context";

const initState = {
  isAuth: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH":
      return {
        isAuth: action.payload,
      };

    case "UN-AUTH":
      return {
        isAuth: action.payload,
      };

    default:
      return initState;
  }
};

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initState);

  const authHandler = () => {
    dispatch({ type: "AUTH", payload: true });
  };

  const unAuthHandler = () => {
    dispatch({ type: "UN-AUTH", payload: false });
  };

  const value = {
    isAuth: authState.isAuth,
    auth: authHandler,
    unAuth: unAuthHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
