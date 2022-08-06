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
        url: `products?limit=3`,
      },
      (data) => setOtherProduct(data)
    );
  }, [requestHttp]);

  return (
    <section className="">
      <h1>You May Also Like</h1>
      <ul className="">
        {loading.isLoading ? (
          <p>{loading.loadingMessage}</p>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </section>
  );
};

export default OtherProduct;
