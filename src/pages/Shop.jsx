import React from "react";

import AllProduct from "../components/Shop/AllProduct";

const Shop = () => {
  return (
    <>
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6 md:min-h-[30vh]">
        <h1 className="font-noto text-3xl uppercase">Shop</h1>
        <p className="font-manrope text-sm">
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
