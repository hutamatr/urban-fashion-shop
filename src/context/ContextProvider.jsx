import React from 'react';
import CartProvider from './CartProvider';
import AuthProvider from './AuthProvider';
import WishlistProvider from './WishlistProvider';

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
