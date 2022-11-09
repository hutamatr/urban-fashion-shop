import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import RequireAuth from "./components/Auth/RequireAuth";
import ProductDetails from "./pages/ProductDetails";
import MyAccount from "./pages/MyAccount";
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
