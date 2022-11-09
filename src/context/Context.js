import React from "react";

export const CartContext = React.createContext({
  items: [],
  totalPriceAmount: 0,
  addItem: (item) => {},
  decreaseItem: (id) => {},
  deleteItem: (id) => {},
});

export const AuthContext = React.createContext({
  isAuth: false,
  auth: () => {},
  unAuth: () => {},
  authSuccess: {},
  setAuthSuccess: {},
  unAuthSuccess: {},
  setUnAuthSuccess: {},
});

export const WishlistContext = React.createContext({
  wishListItems: [],
  addToWishList: (item) => {},
  deleteWishList: (id) => {},
});
