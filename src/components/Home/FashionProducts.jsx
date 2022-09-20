import React from "react";

import Button from "../UI/Button";

import imageHome from "../../assets/image/home-image.webp";

const FashionProducts = () => {
  return (
    <section className="flex min-h-screen flex-col bg-home-image bg-cover md:grid md:min-h-fit md:grid-cols-2 md:flex-row md:bg-none lg:min-h-[50vh]">
      <img src={imageHome} alt="" className="hidden object-contain md:block" />
      <div className="grid min-h-screen grid-cols-1 content-end gap-4 p-6 md:min-h-fit md:content-between md:p-10">
        <div className="flex flex-col gap-y-3">
          <h1 className="font-noto text-4xl uppercase md:text-5xl md:text-dark-brown">
            Fashion <br /> Products
          </h1>
          <p className="mb-4 text-sm md:text-lg md:text-dark-brown">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A fugit
            ipsam, dignissimos optio odio atque aspernatur cumque perferendis,
            nobis, ad omnis! Voluptatem repudiandae consequuntur ducimus?
          </p>
        </div>
        <Button
          className={
            "border-dark-brown bg-transparent py-4 text-dark-brown hover:bg-dark-brown hover:text-white-bone md:duration-300"
          }
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default FashionProducts;
