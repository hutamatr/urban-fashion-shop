import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import SortProduct from "./SortProduct";
import Figure from "../UI/Figure";
import useAxios from "../../hooks/useAxios";

const sortProductsByPrice = (products, ascending) => {
  return products.sort((productA, productB) => {
    if (ascending) {
      return productA.price - productB.price;
    } else {
      return productB.price - productA.price;
    }
  });
};

const AllProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const { requestHttp, loading, error } = useAxios();

  const navigate = useNavigate();
  const location = useLocation();

  const filteredProduct = allProducts.filter((product) => {
    return product.category !== "electronics";
  });

  const queryParams = new URLSearchParams(location.search);

  const isSortedProductList = queryParams.get("sort") === "asc";

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
    <ul className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-4 lg:grid-cols-6">
      {sortedQuotes.map((product) => {
        return (
          <li key={product.id}>
            {loading.isLoading ? (
              <p className="mx-auto text-center font-manrope font-medium uppercase">
                {loading.loadingMessage}
              </p>
            ) : (
              <Link to={`${product.id}`}>
                <Figure
                  {...product}
                  classImage="object-contain h-52 w-48 bg-white object-center p-4"
                />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className="flex min-w-full flex-col border-b border-b-dark-brown">
      <SortProduct
        onNavigate={navigate}
        onSortedProduct={isSortedProductList}
      />
      {error.isError ? (
        <p className="mx-auto py-6 text-center font-manrope font-medium uppercase text-red-700">
          {error.errorMessage}
        </p>
      ) : (
        productContent
      )}
    </section>
  );
};

export default AllProduct;
