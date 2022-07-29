import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen bg-hero-image bg-cover bg-center">
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center gap-y-3 divide-y-2 divide-dark-brown px-6 text-center text-dark-brown md:max-w-[50%]">
        <h1 className="font-noto text-4xl font-medium uppercase lg:text-7xl">
          Fashions fade, style is eternal.
        </h1>

        <div className="flex flex-col items-center justify-center gap-y-2">
          <h2 className="font-noto text-2xl uppercase">
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </h2>
          <p className="lg:text-md font-manrope text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            eveniet? Facilis ab id placeat aliquam eligendi, commodi obcaecati
            praesentium. Consectetur?
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
