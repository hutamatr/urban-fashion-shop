import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Figure from "../UI/Figure";

import useAxios from "../../hooks/useAxios";

const OtherProduct = () => {
  const [otherProduct, setOtherProduct] = useState([]);
  const { requestHttp, loading, error } = useAxios();

  useEffect(() => {
    requestHttp(
      {
        method: "GET",
        url: `products?limit=4`,
      },
      (data) => setOtherProduct(data)
    );
  }, [requestHttp]);

  return (
    <section className="mb-6 flex flex-col gap-y-6 px-6">
      <h1 className="p-4 text-center font-noto text-3xl font-semibold dark:text-white-bone sm:text-left">
        You May Also Like
      </h1>
      {loading.isLoading && (
        <p className="text-center text-xl font-medium dark:text-white-bone">
          {loading.loadingMessage}
        </p>
      )}
      {error.isError && (
        <p className="text-center text-xl font-medium text-red-600">
          {error.errorMessage}
        </p>
      )}
      {!loading.isLoading && !error.isError && (
        <ul className="grid grid-cols-2 gap-4 bg-white-bone dark:bg-dark-brown sm:grid-cols-4 md:gap-8 lg:gap-16">
          {otherProduct.map((product) => {
            return (
              <li key={product.id}>
                <Link to={`/shop/${product.id}`}>
                  <Figure
                    {...product}
                    classImage="object-contain h-52 w-48 bg-white object-center p-4"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default OtherProduct;
