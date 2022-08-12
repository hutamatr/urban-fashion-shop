import React from "react";

import useCartContext from "../../hooks/useCartContext";
import { formatCurrencyToFixed } from "../../utils/formatCurrency";

const CartList = () => {
  const { items } = useCartContext();

  console.log(items);

  return (
    <section className="">
      <ul className="flex flex-col gap-y-4">
        {items.map((item) => {
          const { id, amount, title, price, image } = item;
          return (
            <li key={id} className="border border-dark-brown">
              <div className="flex flex-row items-center gap-x-4">
                <img
                  src={image}
                  alt=""
                  className="h-24 min-w-[6rem] border border-dark-brown bg-white object-contain object-center p-4"
                />
                <div className="flex flex-col">
                  <p className="text-xs uppercase">{title}</p>
                  <span>amount : {amount}</span>
                  <span>Rp. {formatCurrencyToFixed(price)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CartList;
