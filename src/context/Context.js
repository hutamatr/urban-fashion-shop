import React from "react";

export const CartContext = React.createContext({
  items: [],
  totalPriceAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export const AuthContext = React.createContext({
  isAuth: false,
  auth: () => {},
  unAuth: () => {},
});
