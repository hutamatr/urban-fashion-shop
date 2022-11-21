import React from "react";

import AllProduct from "../../components/Shop/AllProduct";

const Shop = () => {
  return (
    <>
      <section className="flex min-h-[40vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6 md:min-h-fit md:py-12">
        <h1 className="font-noto text-3xl uppercase md:text-4xl">Shop</h1>
      </section>
      <AllProduct />
    </>
  );
};

export default Shop;