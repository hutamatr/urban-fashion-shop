import React from "react";
import { Carousel } from "flowbite-react";

import heroImage1 from "../../assets/image/hero-image-1.webp";
import heroImage2 from "../../assets/image/hero-image-2.webp";
import heroImage3 from "../../assets/image/hero-image-3.webp";

const Hero = () => {
  const heroImage = [heroImage1, heroImage2, heroImage3];
  return (
    <div className="h-56 sm:h-72 xl:h-[85vh] 2xl:h-[50vh]">
      <Carousel>
        {heroImage.map((image, index) => (
          <img src={image} alt={`hero-${index}`} key={index} loading="lazy" />
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
