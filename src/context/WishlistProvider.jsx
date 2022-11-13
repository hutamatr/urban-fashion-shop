import React, { useReducer } from "react";

import { WishlistContext } from "./Context";

const initState = {
  wishListItems: [],
};

const wishListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_WISHLIST":
      const newWishListItem = [...state.wishListItems, action.payload];

      return {
        wishListItems: newWishListItem,
      };

    case "DELETE_WISHLIST":
      const deletedWishList = state.wishListItems.filter(
        (item) => item.id !== action.payload
      );

      return {
        wishListItems: deletedWishList,
      };

    default:
      return initState;
  }
};

const WishlistProvider = ({ children }) => {
  const [wishListState, dispatch] = useReducer(wishListReducer, initState);

  const addWishListHandler = (item) => {
    dispatch({ type: "ADD_WISHLIST", payload: item });
  };

  const deleteWishListHandler = (id) => {
    dispatch({ type: "DELETE_WISHLIST", payload: id });
  };

  const value = {
    wishListItems: wishListState.wishListItems,
    addToWishList: addWishListHandler,
    deleteWishList: deleteWishListHandler,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
