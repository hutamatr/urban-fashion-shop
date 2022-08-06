import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Figure from "../UI/Figure";
import useAxios from "../../hooks/useAxios";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  const { requestHttp, loading, error } = useAxios();

  useEffect(() => {
    requestHttp(
      {
        method: "GET",
        url: "products?limit=4",
        headers: false,
      },
      (data) => setBestSellers(data)
    );
  }, [requestHttp]);

  const bestSellersContent = (
    <ul className="grid grid-cols-2 justify-items-center gap-3 md:grid-cols-4 md:grid-rows-1 lg:gap-6">
      {bestSellers.map((product) => {
        return (
          <li key={product.id}>
            {loading.isLoading ? (
              <p className="mx-auto text-center font-manrope font-light uppercase">
                {loading.loadingMessage}
              </p>
            ) : (
              <Link to={`shop/${product.id}`}>
                <Figure
                  {...product}
                  classImage="object-contain h-52 w-48 bg-white object-center p-4 lg:h-64 lg:w-52"
                />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
  return (
    <section className="grid grid-cols-1 gap-y-4 border-b border-dark-brown p-6 text-dark-brown md:grid-cols-1 md:p-10">
      <h1 className="mb-2 text-center font-noto text-4xl uppercase md:text-5xl">
        BestSellers
      </h1>
      {error.isError ? (
        <p className="mx-auto text-center font-manrope font-medium uppercase text-red-700">
          {error.errorMessage}
        </p>
      ) : (
        bestSellersContent
      )}
    </section>
  );
};

export default BestSellers;
