import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from 'pages/LoginPage';
import Register from 'pages/RegisterPage';
import Home from 'pages/HomePage';
import Shop from 'pages/ShopPage';
import Cart from 'pages/CartPage';
import ProductDetails from 'pages/ProductDetailsPage';
import MyAccount from 'pages/MyAccountPage';
import RequireAuth from 'components/Auth/RequireAuth';
import Wishlist from 'components/Wishlist/Wishlist';
import Layout from 'components/Layout/Layout';
import { useAuth } from 'hooks/useStoreContext';

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='shop/:productId' element={<ProductDetails />} />
        <Route path='cart' element={<Cart />} />
        <Route path='login' element={isAuth ? <Home /> : <Login />} />
        <Route path='register' element={isAuth ? <Home /> : <Register />} />
        <Route element={<RequireAuth />}>
          <Route path='account' element={<MyAccount />} />
          <Route path='wishlist' element={<Wishlist />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
