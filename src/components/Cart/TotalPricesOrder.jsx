import React from "react";

import { formatCurrencyToFixed } from "../../utils/formatCurrency";

const shippingCost = 20000;

const TotalPricesOrder = ({ totalCartItems, totalPriceAmount }) => {
  return (
    <>
      <div className="mt-4 flex justify-between sm:flex-row sm:items-center">
        <p>
          Subtotal (<span className="font-medium">{totalCartItems}</span>
          {totalCartItems === 1 ? " Item" : " Items"} ) :
        </p>
        <span className="font-medium">
          Rp. {formatCurrencyToFixed(totalPriceAmount)}
        </span>
      </div>
      {totalCartItems >= 1 && (
        <div className="flex justify-between border-b border-b-dark-brown pb-2 sm:flex-row sm:items-center">
          <p>Shipping</p>
          <span className="font-medium">
            Rp. {formatCurrencyToFixed(shippingCost)}
          </span>
        </div>
      )}

      <div className="flex justify-between font-bold sm:flex-row sm:items-center">
        <p>Total</p>
        <span>
          Rp.
          {formatCurrencyToFixed(
            totalPriceAmount + (totalCartItems >= 1 ? shippingCost : 0)
          )}
        </span>
      </div>
    </>
  );
};

export default TotalPricesOrder;
