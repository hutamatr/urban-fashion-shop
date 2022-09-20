import React from "react";

import AllProduct from "../components/Shop/AllProduct";

const Shop = () => {
  return (
    <>
      <section className="flex min-h-[40vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6 md:mt-10 md:min-h-fit md:py-12">
        <h1 className="font-noto text-3xl uppercase md:text-4xl">Shop</h1>
        <p className="max-w-md text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad pariatur
          inventore eveniet omnis velit ipsa! At molestias quasi velit ad
          maiores. Earum vel ab ipsam.
        </p>
      </section>
      <AllProduct />
    </>
  );
};

export default Shop;
