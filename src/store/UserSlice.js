import { fetcherUser } from 'api/api';

export const createUserSlice = (set) => ({
  user: {},
  isLoadingUser: false,
  isErrorUser: false,
  errorUser: null,
  getUser: async () => {
    try {
      set({ isLoading: true });
      const userData = await fetcherUser();
      set({
        isLoading: false,
        user: userData,
      });
    } catch (error) {
      set({ isError: true, isLoading: false, error });
    }
  },
});
