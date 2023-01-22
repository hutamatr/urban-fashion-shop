import React from 'react';

export const CartContext = React.createContext({
  items: [],
  totalPriceAmount: 0,
  addItem: () => {},
  decreaseItem: () => {},
  deleteItem: () => {},
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
  addToWishList: () => {},
  deleteWishList: () => {},
});
