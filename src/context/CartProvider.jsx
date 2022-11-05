import React, { useReducer } from "react";
import { CartContext } from "./Context";

const initCart = {
  items: [],
  totalPriceAmount: 0,
};

const cartReducer = (state, action) => {
  const existingItem = (state, action) => {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action
    );

    const existingItem = state.items[existingItemIndex];

    return {
      existingItemIndex,
      existingItem,
    };
  };

  switch (action.type) {
    case "ADD_ITEM":
      const {
        existingItemIndex: existingCartItemIndex,
        existingItem: existingCartItem,
      } = existingItem(state, action.payload.id);

      const updatedTotalPrice =
        state.totalPriceAmount + action.payload.price * action.payload.amount;

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
    case "DECREASE_ITEM":
      const {
        existingItemIndex: existingRemoveItemsIndex,
        existingItem: existingItems,
      } = existingItem(state, action.payload);
      const removedTotalPriceAmount =
        state.totalPriceAmount - existingItems.price;
      const removedTotalPriceAmountToFixed =
        +removedTotalPriceAmount.toFixed(2);

      let removedItems;

      // if (existingItems.amount === 1) {
      //   removedItems = state.items.filter((item) => item.id !== action.payload);
      // } else {
      let removedItem = {
        ...existingItems,
        amount: existingItems.amount - 1,
      };
      removedItems = [...state.items];
      removedItems[existingRemoveItemsIndex] = removedItem;
      // }

      return {
        items: removedItems,
        totalPriceAmount: removedTotalPriceAmountToFixed,
      };

    case "DELETE_ITEM":
      const { existingItem: existingDeleteItem } = existingItem(
        state,
        action.payload
      );

      const deleteTotalPriceAmount =
        state.totalPriceAmount -
        existingDeleteItem.price * existingDeleteItem.amount;

      const deleteItems = state.items.filter(
        (item) => item.id !== action.payload
      );

      return {
        items: deleteItems,
        totalPriceAmount: deleteTotalPriceAmount,
      };

    default:
      return initCart;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initCart);

  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", payload: item });
  };

  const decreaseItemHandler = (id) => {
    dispatchCart({ type: "DECREASE_ITEM", payload: id });
  };

  const deleteItemHandler = (id) => {
    dispatchCart({ type: "DELETE_ITEM", payload: id });
  };

  const { items, totalPriceAmount } = cartState;

  const value = {
    items,
    totalPriceAmount,
    addItem: addItemHandler,
    decreaseItem: decreaseItemHandler,
    deleteItem: deleteItemHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
