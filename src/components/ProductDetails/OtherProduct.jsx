import React, { useState, useEffect } from "react";

import Figure from "../UI/Figure";

import useAxios from "../../hooks/useAxios";

const OtherProduct = () => {
  const [otherProduct, setOtherProduct] = useState([]);
  const { requestHttp, loading } = useAxios();

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
    <section className="mb-6 flex flex-col gap-y-6">
      <h1 className="p-4 text-center font-noto text-3xl font-semibold sm:text-left">
        You May Also Like
      </h1>
      {loading.isLoading ? (
        <p className="text-center text-xl font-medium">
          {loading.loadingMessage}
        </p>
      ) : (
        <ul className="flex flex-col justify-around sm:flex-row">
          {otherProduct.map((product) => {
            return (
              <li key={product.id}>
                <Figure
                  {...product}
                  classImage="object-contain h-52 w-48 bg-white object-center p-4"
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default OtherProduct;
