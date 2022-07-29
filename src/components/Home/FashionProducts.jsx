import React from "react";

const FashionProducts = () => {
  return (
    <section className="flex min-h-screen flex-col bg-home-image bg-cover md:flex-row">
      <div className="grid min-h-screen grid-flow-row content-end gap-4 p-6">
        <h1 className="font-noto text-4xl uppercase text-white-bone">
          Fashion <br /> Products
        </h1>
        <p className="mb-4 text-xs text-white-bone">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
          veritatis accusantium vero veniam dolores ratione consequuntur quod,
          ea praesentium eveniet reprehenderit, necessitatibus cum. Aliquam
          molestias vel doloribus ad quisquam dolores.
        </p>
        <button className="w-full py-4 text-xl font-light uppercase text-white-bone ring-[1px] ring-white-bone">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default FashionProducts;
