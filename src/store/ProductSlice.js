import { fetcherProducts, fetcherCategories } from 'api/api';

export const createProductSlice = (set) => ({
  products: [],
  product: {},
  categories: [],
  isLoadingProducts: false,
  isErrorProducts: false,
  errorProducts: null,
  getAllProducts: async () => {
    try {
      set({ isLoading: true, isError: false });
      const productsData = await fetcherProducts();
      set({
        isLoading: false,
        products: productsData.filter(
          (product) => product.category !== 'electronics'
        ),
      });
    } catch (error) {
      set({ isError: true, isLoading: false, error });
    }
  },
  getCategories: async () => {
    try {
      set({ isLoading: true });
      const categoriesData = await fetcherCategories();
      set({
        isLoading: false,
        categories: categoriesData.filter(
          (category) => category !== 'electronics'
        ),
      });
    } catch (error) {
      set({ isError: true, isLoading: false, error });
    }
  },
  getProductDetail: (productId) => {
    set((state) => ({
      product: state.products?.find((item) => item.id === productId),
    }));
  },
});
