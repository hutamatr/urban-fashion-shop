const existingItem = (state, action) => {
  const existingItemIndex = state.items.findIndex((item) => item.id === action);

  const existingItem = state.items[existingItemIndex];

  return {
    existingItemIndex,
    existingItem,
  };
};

export const createCartSlice = (set) => ({
  items: [],
  totalPriceAmount: 0,
  totalCart: 0,
  totalCartHandler: () =>
    set((state) => ({
      totalCart: state.items?.reduce((curr, item) => curr + item.amount, 0),
    })),
  addItem: (item) =>
    set((state) => {
      const {
        existingItemIndex: existingCartItemIndex,
        existingItem: existingCartItem,
      } = existingItem(state, item.id);

      const updatedTotalPrice =
        state.totalPriceAmount + item.price * item.amount;

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + item.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(item);
      }
      return {
        items: updatedItems,
        totalPriceAmount: updatedTotalPrice,
      };
    }),
  decreaseItem: (itemId) =>
    set((state) => {
      const {
        existingItemIndex: existingRemoveItemsIndex,
        existingItem: existingItems,
      } = existingItem(state, itemId);
      const removedTotalPriceAmount =
        state.totalPriceAmount - existingItems.price;
      const removedTotalPriceAmountToFixed =
        +removedTotalPriceAmount.toFixed(2);

      let removedItems;

      let removedItem = {
        ...existingItems,
        amount: existingItems.amount - 1,
      };
      removedItems = [...state.items];
      removedItems[existingRemoveItemsIndex] = removedItem;

      return {
        items: removedItems,
        totalPriceAmount: removedTotalPriceAmountToFixed,
      };
    }),
  deleteItem: (itemId) =>
    set((state) => {
      const { existingItem: existingDeleteItem } = existingItem(state, itemId);

      const deleteTotalPriceAmount =
        state.totalPriceAmount -
        existingDeleteItem.price * existingDeleteItem.amount;

      const deleteItems = state.items.filter((item) => item.id !== itemId);

      return {
        items: deleteItems,
        totalPriceAmount: deleteTotalPriceAmount,
      };
    }),
});
