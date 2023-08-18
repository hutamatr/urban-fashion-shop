import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authSlice';
import cartReducer from './cartSlice';
import modalReducer from './modalSlice';
import orderReducer from './orderSlice';
import productsReducer from './productSlice';
import userReducer from './userSlice';
import wishlistReducer from './wishlistSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['products', 'order', 'user'],
};

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  products: productsReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'auth/loginUser/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['register'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
