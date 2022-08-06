import React from "react";

import Button from "../UI/Button";

import imageHome from "../../assets/image/home-image.webp";

const FashionProducts = () => {
  return (
    <section className="flex min-h-screen flex-col border-b border-dark-brown bg-home-image bg-cover md:grid md:min-h-fit md:grid-cols-2 md:flex-row md:bg-none lg:min-h-[50vh]">
      <img src={imageHome} alt="" className="hidden object-contain md:block" />
      <div className="grid min-h-screen grid-cols-1 content-end gap-4 p-6 md:min-h-fit md:content-between md:p-10">
        <div className="flex flex-col gap-y-3">
          <h1 className="font-noto text-4xl uppercase text-white-bone md:text-5xl md:text-dark-brown">
            Fashion <br /> Products
          </h1>
          <p className="mb-4 text-sm text-white-bone md:text-lg md:text-dark-brown">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A fugit
            ipsam, dignissimos optio odio atque aspernatur cumque perferendis,
            nobis, ad omnis! Voluptatem repudiandae consequuntur ducimus?
          </p>
        </div>
        <Button
          className={
            "border-white-bone bg-transparent py-4 text-white-bone md:border-dark-brown md:text-dark-brown md:duration-300 md:hover:bg-dark-brown md:hover:text-white-bone"
          }
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default FashionProducts;
