import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ProductItem from "./ProductItem";
import SortProduct from "./SortProduct";
import useAxios from "hooks/useAxios";

const sortProductsByPrice = (products, ascending) => {
  return products.sort((productA, productB) => {
    const { price: priceA } = productA;
    const { price: priceB } = productB;
    if (ascending) {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });
};

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);

  const { requestHttp, loading, error } = useAxios();

  const navigate = useNavigate();
  const location = useLocation();

  const filteredProduct = allProducts.filter((product) => {
    return product.category !== "electronics";
  });

  const queryParams = new URLSearchParams(location.search);

  const isSortedProductList = queryParams.get("sort") === "low-to-high";

  const sortedQuotes = sortProductsByPrice(
    filteredProduct,
    isSortedProductList
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestHttp(
      {
        method: "GET",
        url: "products",
      },
      (data) => setAllProducts(data)
    );
  }, [requestHttp]);

  const productContent = (
    <ul className="grid grid-cols-2 gap-3 bg-white-bone p-6 dark:bg-dark-brown sm:grid-cols-3 lg:grid-cols-4">
      {sortedQuotes.map((product) => {
        return (
          <ProductItem
            product={product}
            linkTo={`${product.id}`}
            key={product.id}
          />
        );
      })}
    </ul>
  );

  return (
    <section className="flex min-w-full flex-col">
      <SortProduct
        onNavigate={navigate}
        onSortedProduct={isSortedProductList}
      />
      {loading.isLoading && (
        <p className="mx-auto my-[25vh] min-h-[50vh] text-center font-semibold uppercase dark:text-white-bone">
          {loading.loadingMessage}
        </p>
      )}
      {error.isError && (
        <p className="mx-auto py-6 text-center font-medium uppercase text-red-700">
          {error.errorMessage}
        </p>
      )}
      {!loading.isLoading && !error.isError && productContent}
    </section>
  );
};

export default ProductList;
