import React from "react";
import { useNavigate } from "react-router-dom";

import { useCart, useAuth } from "../../hooks/useStoreContext";
import { formatCurrencyToFixed } from "../../utils/formatCurrency";
import useFormState from "../../hooks/useFormState";
import Button from "../UI/Button";
import Input from "../UI/Input";

const inputClassName =
  "w-full rounded-sm border-2 border-dark-brown bg-white-bone p-2 text-sm font-medium outline-none placeholder:text-sm focus:border-dark-brown focus:ring-0 placeholder:uppercase";

const ShoppingSummary = ({ totalCartItems }) => {
  const { input, setInput, onChangeInputHandler } = useFormState({
    fullName: "",
    email: "",
    street: "",
    phone: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
  });

  const { fullName, email, street, phone, zipCode, city, state, country } =
    input;

  const { totalPriceAmount } = useCart();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const OrderHandler = () => {
    if (isAuth) {
      //
    } else {
      navigate("/login");
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log("formCheckOut", input);

    setInput({
      fullName: "",
      email: "",
      street: "",
      phone: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
    });
  };

  return (
    <section className="flex flex-col gap-y-4">
      <h3 className="text-lg font-semibold">Shipping detail</h3>
      <form className="flex flex-col gap-y-3" onSubmit={formSubmitHandler}>
        <div className="grid w-full grid-cols-2 gap-2">
          <Input
            name="fullName"
            type="text"
            className={inputClassName}
            placeholder="full name"
            value={fullName}
            onChange={onChangeInputHandler}
          />
          <Input
            name="email"
            type="email"
            className={inputClassName}
            value={email}
            placeholder="email"
            onChange={onChangeInputHandler}
          />
          <Input
            name="street"
            type="text"
            className={inputClassName}
            placeholder="street"
            value={street}
            onChange={onChangeInputHandler}
          />
          <Input
            name="phone"
            type="text"
            className={inputClassName}
            placeholder="phone"
            value={phone}
            onChange={onChangeInputHandler}
          />
        </div>
        <div className=" flex flex-row items-center gap-x-2">
          <Input
            name="zipCode"
            type="number"
            className={inputClassName}
            placeholder="zipcode"
            value={zipCode}
            onChange={onChangeInputHandler}
          />
          <Input
            name="city"
            type="text"
            className={inputClassName}
            placeholder="city"
            value={city}
            onChange={onChangeInputHandler}
          />
          <Input
            name="state"
            type="text"
            className={inputClassName}
            placeholder="state"
            value={state}
            onChange={onChangeInputHandler}
          />
        </div>
        <Input
          name="country"
          type="text"
          className={inputClassName}
          placeholder="country"
          value={country}
          onChange={onChangeInputHandler}
        />
        <div className="my-4 flex justify-between sm:flex-row sm:items-center">
          <p>
            Total Prices (<span className="font-medium">{totalCartItems}</span>
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
          onClick={OrderHandler}
          type="submit"
        >
          Order
        </Button>
      </form>
    </section>
  );
};

export default ShoppingSummary;
