import React, { useEffect, useState } from "react";

import Figure from "../UI/Figure";
import useAxios from "../../hooks/useAxios";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  const { requestHttp, loading, error } = useAxios();

  useEffect(() => {
    requestHttp(
      {
        method: "GET",
        url: "products?limit=3",
        headers: false,
      },
      (data) => setBestSellers(data)
    );
  }, [requestHttp]);

  const bestContent = bestSellers.map((item) => {
    return loading.isLoading ? (
      <p
        key={item.id}
        className="mx-auto text-center font-manrope font-light uppercase text-dark-brown"
      >
        {loading.loadingMessage}
      </p>
    ) : (
      <Figure
        {...item}
        key={item.id}
        classImage="object-contain h-52 w-48 bg-white object-center p-4"
      />
    );
  });

  return (
    <section className="grid grid-flow-row justify-items-center gap-y-6 border-b border-dark-brown p-6">
      <h1 className="mb-2 font-noto text-4xl uppercase">BestSellers</h1>
      {error.isError ? (
        <p className="mx-auto text-center font-manrope font-medium uppercase text-red-700">
          {error.errorMessage}
        </p>
      ) : (
        bestContent
      )}
    </section>
  );
};

export default BestSellers;
