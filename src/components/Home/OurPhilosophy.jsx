import React from "react";

import philosophyImage from "../../assets/image/philosophy-image.webp";

const OurPhilosophy = () => {
  return (
    <section className="grid min-h-[50vh] grid-cols-1 gap-y-4 border-b border-b-dark-brown p-6">
      <h1 className="font-noto text-4xl uppercase">Our Philosophy</h1>
      <p className="border-b-[1px] border-b-dark-brown font-manrope text-sm font-light uppercase">
        You have a more interesting life if you wear impressive clothes.
      </p>
      <img src={philosophyImage} alt="" className="ring-1 ring-dark-brown" />
    </section>
  );
};

export default OurPhilosophy;
