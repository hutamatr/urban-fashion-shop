import React from "react";
import CartProvider from "./CartProvider";
import AuthProvider from "./AuthProvider";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
