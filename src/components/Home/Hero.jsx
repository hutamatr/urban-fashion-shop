import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen border-b border-dark-brown bg-hero-image bg-cover bg-center">
      <div className="mx-auto mt-10 grid min-h-screen grid-cols-1 items-center justify-items-center px-6 text-center md:max-w-[70vw]">
        <h1 className="font-noto text-4xl font-medium uppercase md:text-6xl">
          Fashions fade, style is eternal.
        </h1>

        <div className="flex flex-col items-center justify-center gap-y-2">
          <h2 className="border-b-2 border-b-dark-brown font-noto text-2xl font-semibold uppercase md:text-3xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </h2>
          <p className="md:text-md font-manrope font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ipsa
            similique laudantium quasi molestiae ratione!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
