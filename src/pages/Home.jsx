import React, { useEffect, useState } from "react";

import Figure from "../components/UI/Figure";
import Hero from "../components/Home/Hero";
import FashionProducts from "../components/Home/FashionProducts";
import BestSellers from "../components/Home/BestSellers";
import OurPhilosophy from "../components/Home/OurPhilosophy";
import useAxios from "../hooks/useAxios";

const Home = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const { requestHttp, loading, error } = useAxios();

  useEffect(() => {
    requestHttp(
      {
        method: "GET",
        url: "products?limit=2",
        headers: false,
      },
      (data) => setDataProduct(data)
    );
  }, [requestHttp]);

  const imageContent = (
    <div className="flex flex-row justify-around gap-x-4">
      {dataProduct.map((product) => {
        return loading.isLoading ? (
          <p
            key={product.id}
            className="mx-auto text-center font-semibold uppercase text-dark-brown"
          >
            {loading.loadingMessage}
          </p>
        ) : (
          <Figure {...product} key={product.id} />
        );
      })}
    </div>
  );

  return (
    <>
      <Hero />
      <section className="flex min-h-screen flex-col p-6">
        <div className="grid min-h-[50vh] grid-flow-row gap-8">
          <h1 className="font-noto text-4xl font-light uppercase italic">
            Care for your clothes like the good friends they are.
          </h1>
          <span className="flex justify-end text-end font-light uppercase italic">
            -Joan Crawford
          </span>
        </div>
        {imageContent}
      </section>
      <FashionProducts />
      <BestSellers />
      <OurPhilosophy />
    </>
  );
};

export default Home;
