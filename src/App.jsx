import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:productId" element={<ProductDetails />} />
      </Routes>
    </Layout>
  );
};

export default App;
