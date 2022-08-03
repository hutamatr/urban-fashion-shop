import React from "react";

import formatCurrency from "../../utils/formatCurrency";

const Figure = ({ image, title, price, id, classImage }) => {
  return (
    <figure id={id} className="grid min-h-full max-w-fit grid-cols-1 gap-3">
      <img
        src={image}
        alt={title}
        className={`border border-dark-brown ${classImage}`}
      />
      <figcaption className="max-w-fit text-xs uppercase duration-300 hover:font-semibold">
        {title}
      </figcaption>
      <span className="flex items-center border-b border-b-dark-brown text-sm font-light uppercase">
        Rp. {formatCurrency(price)}
      </span>
    </figure>
  );
};

export default Figure;
