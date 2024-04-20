import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { isDevelopment } from '@utils/constant';

import authReducer from './auth.slice';
import cartReducer from './cart.slice';
import modalReducer from './modal.slice';
import orderReducer from './order.slice';
import productsReducer from './product.slice';
import userReducer from './user.slice';
import wishlistReducer from './wishlist.slice';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['products', 'order', 'user', 'wishlist', 'modal'],
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
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'auth/loginUser/fulfilled',
          'auth/registerUser/fulfilled',
          'auth/logoutUser/fulfilled',
        ],
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
