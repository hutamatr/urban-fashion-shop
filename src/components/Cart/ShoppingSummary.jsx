import React from "react";

import { useCart } from "../../hooks/useStoreContext";
import { formatCurrencyToFixed } from "../../utils/formatCurrency";
import Button from "../UI/Button";

const ShoppingSummary = ({ totalCartItems }) => {
  const { totalPriceAmount } = useCart();

  return (
    <>
      <section className="flex flex-col gap-y-5">
        <h3 className="text-lg font-semibold">Shopping Summary</h3>
        <div className="flex justify-between sm:flex-row sm:items-center">
          <p>
            Total Prices ( <span className="font-medium">{totalCartItems}</span>{" "}
            {totalCartItems === 1 ? "Item" : "Items"} ) :
          </p>
          <span className="font-medium">
            Rp. {formatCurrencyToFixed(totalPriceAmount)}
          </span>
        </div>
        <Button
          className={
            "!bg-dark-brown py-3 text-white-bone disabled:cursor-not-allowed"
          }
          disabled={totalCartItems < 1}
        >
          Order
        </Button>
      </section>
    </>
  );
};

export default ShoppingSummary;
