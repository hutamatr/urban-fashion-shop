import React, { useEffect, useState } from "react";

import Figure from "../UI/Figure";
import useAxios from "../../hooks/useAxios";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  const { requestHttp } = useAxios();

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

  return (
    <section className="grid grid-flow-row justify-items-center gap-y-6 border-b border-dark-brown p-6">
      <h1 className="mb-2 font-noto text-4xl uppercase">BestSellers</h1>
      {bestSellers.map((item) => {
        return <Figure {...item} key={item.id} />;
      })}
    </section>
  );
};

export default BestSellers;
