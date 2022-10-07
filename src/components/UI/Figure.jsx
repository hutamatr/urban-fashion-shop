import React from "react";

import { formatCurrency } from "../../utils/formatCurrency";

const Figure = ({ image, title, price, id, classImage }) => {
  return (
    <figure
      id={id}
      className="mx-auto grid min-h-full max-w-max grid-cols-1 gap-3 border-b border-b-dark-brown duration-200 hover:bg-dark-brown hover:text-white-bone"
    >
      <img
        src={image}
        alt={title}
        className={`border border-dark-brown ${classImage} hover:border-2`}
        loading="lazy"
      />
      <figcaption className="max-w-fit px-2 text-xs uppercase duration-300">
        {title}
      </figcaption>
      <span className="flex items-center justify-self-end px-2 pb-2 text-sm font-semibold">
        Rp {formatCurrency(price)}
      </span>
    </figure>
  );
};

export default Figure;
