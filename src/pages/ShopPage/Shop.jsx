import React from "react";

import AllProduct from "../../components/Shop/AllProduct";

const Shop = () => {
  return (
    <>
      <section className="flex min-h-[25vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6 dark:border-b-white-bone md:min-h-fit md:py-12">
        <h1 className="font-noto text-3xl uppercase dark:text-white-bone md:text-4xl">
          Shop
        </h1>
      </section>
      <AllProduct />
    </>
  );
};

export default Shop;
