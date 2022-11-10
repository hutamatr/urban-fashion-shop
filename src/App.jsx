import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Home from "./pages/HomePage/Home";
import Shop from "./pages/ShopPage/Shop";
import Cart from "./pages/CartPage/Cart";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails";
import MyAccount from "./pages/MyAccountPage/MyAccount";
import RequireAuth from "./components/Auth/RequireAuth";
import Wishlist from "./components/Wishlist/Wishlist";
import { useAuth } from "./hooks/useStoreContext";

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:productId" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={isAuth ? <Home /> : <Login />} />
        <Route path="register" element={isAuth ? <Home /> : <Register />} />
        <Route element={<RequireAuth />}>
          <Route path="account" element={<MyAccount />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
