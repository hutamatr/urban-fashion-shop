export const createWishListSlice = (set) => ({
  wishlistItems: [],
  addWishlist: (newWishlist) =>
    set((state) => ({
      wishlistItems: [...state.wishlistItems, newWishlist],
    })),
  deleteWishlist: (wishlistId) =>
    set((state) => ({
      wishlistItems: state.wishlistItems.filter(
        (list) => list.id !== wishlistId
      ),
    })),
});
