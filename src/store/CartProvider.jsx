import React, { useReducer } from "react";
import CartContext from "./CartContext.js";

const initCart = {
  items: [],
  totalPriceAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedTotalPrice =
        state.totalPriceAmount + action.payload.price * action.payload.amount;
      console.log(updatedTotalPrice);
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      return {
        items: updatedItems,
        totalPriceAmount: updatedTotalPrice,
      };

    default:
      return initCart;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initCart);

  console.log(cartState);

  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", payload: item });
  };

  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", payload: id });
  };

  const clearItemHandler = () => {
    dispatchCart({ type: "CLEAR_ITEM" });
  };

  const { items, totalPriceAmount } = cartState;

  const value = {
    items,
    totalPriceAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItem: clearItemHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
