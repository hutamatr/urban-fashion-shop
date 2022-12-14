import React from "react";

import { formatCurrency } from "../../utils/formatCurrency";

const Figure = ({ image, title, price, id, classImage }) => {
  return (
    <figure
      id={id}
      className="relative grid min-h-full grid-cols-1 gap-4 border-b border-b-dark-brown duration-300 hover:bg-dark-brown hover:text-white-bone dark:border-b-white-bone dark:bg-dark-brown dark:hover:ring-2 dark:hover:ring-white-bone lg:w-56"
    >
      <img
        src={image}
        alt={title}
        className={`min-w-full border border-dark-brown ${classImage}`}
        loading="lazy"
      />
      <figcaption className="px-2 text-sm font-semibold uppercase duration-300 dark:text-white-bone">
        {title}
      </figcaption>
      <span className="flex items-center justify-self-end px-2 pb-2 text-sm font-semibold dark:text-white-bone">
        Rp {formatCurrency(price)}
      </span>
    </figure>
  );
};

export default Figure;
