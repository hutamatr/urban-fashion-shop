import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../UI/Button";

import imageHome from "../../assets/image/home-image.webp";

const FashionProducts = () => {
  const navigate = useNavigate();

  const goToShopHandler = () => navigate("/shop", { replace: true });

  return (
    <section className="flex min-h-screen flex-col bg-home-image bg-cover md:grid md:min-h-fit md:grid-cols-2 md:flex-row md:bg-none lg:min-h-[50vh]">
      <img
        src={imageHome}
        alt=""
        loading="lazy"
        className="hidden object-contain md:block"
      />
      <div className="grid min-h-screen grid-cols-1 content-end gap-4 p-6 md:min-h-fit md:content-between md:p-10">
        <div className="flex flex-col gap-y-3">
          <h1 className="max-w-fit bg-dark-brown bg-opacity-40 p-1 font-noto text-4xl uppercase text-white-bone dark:bg-white-bone dark:bg-opacity-40 dark:text-dark-brown sm:bg-transparent dark:sm:bg-dark-brown dark:sm:text-white-bone md:text-5xl md:text-dark-brown">
            Fashion <br /> Products
          </h1>
          <p className="mb-4 bg-dark-brown bg-opacity-40 p-1 text-sm text-white-bone dark:bg-white-bone dark:bg-opacity-40 dark:text-dark-brown sm:bg-transparent dark:sm:bg-dark-brown dark:sm:text-white-bone md:text-lg md:text-dark-brown">
            Fashion is part of the daily air and it changes all the time, with
            all the events. You can even see the approaching of a revolution in
            clothes. You can see and feel everything in clothes.
          </p>
        </div>
        <Button
          className={
            "border-dark-brown bg-transparent py-4 text-dark-brown hover:bg-dark-brown hover:text-white-bone dark:border-white-bone dark:text-white-bone md:duration-300"
          }
          onClick={goToShopHandler}
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default FashionProducts;
