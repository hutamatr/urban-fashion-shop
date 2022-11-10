import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import countryList from "react-select-country-list";

import { useCart, useAuth } from "../../hooks/useStoreContext";
import { formatCurrencyToFixed } from "../../utils/formatCurrency";
import useFormState from "../../hooks/useFormState";
import useAxios from "../../hooks/useAxios";
import SelectItems from "../UI/SelectItems";
import Button from "../UI/Button";
import Input from "../UI/Input";

const inputClassName =
  "w-full rounded-sm border-2 border-dark-brown bg-white-bone p-2 text-sm font-medium outline-none placeholder:text-sm focus:border-dark-brown focus:ring-0 placeholder:uppercase";

const shippingCost = 20000;

const ShoppingSummary = ({ totalCartItems }) => {
  const [country, setCountry] = useState("");
  const { input, setInput, onChangeInputHandler } = useFormState({
    fullName: "",
    email: "",
    street: "",
    phone: "",
    zipCode: "",
    city: "",
    province: "",
  });

  const { requestHttp, loading, error } = useAxios();
  const { totalPriceAmount } = useCart();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const countryOption = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("decode"));
    if (userId) {
      requestHttp(
        {
          method: "GET",
          url: `users/${userId.sub}`,
        },
        (data) => {
          const {
            name: { firstname, lastname },
            email,
            address: { city, number, street, zipcode },
            phone,
          } = data;

          setInput((prevState) => ({
            ...prevState,
            email,
            street: `${street}, ${number}`,
            phone,
            city,
            fullName: `${firstname} ${lastname}`,
            zipCode: zipcode,
          }));
        }
      );
    }
  }, [requestHttp, setInput]);

  const { fullName, email, street, phone, zipCode, city, province } = input;

  const OrderHandler = () => {
    if (isAuth) {
      //
    } else {
      navigate("/login");
    }
  };

  const countryChangeHandler = (value) => {
    setCountry(value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (
      !fullName ||
      !email ||
      !street ||
      !phone ||
      !zipCode ||
      !city ||
      !province ||
      !country
    ) {
      alert("error");
      return;
    }

    console.log({
      address: {
        street,
        city,
        province,
        country,
        zipCode,
      },
      fullName,
      email,
      phone,
    });

    setInput({
      fullName: "",
      email: "",
      street: "",
      phone: "",
      zipCode: "",
      city: "",
      province: "",
    });
    setCountry("");
  };

  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center gap-x-4">
        <h3 className="text-lg font-semibold">Shipping detail</h3>
        {loading.isLoading && <Spinner aria-label="Default status example" />}
        {error.isError && (
          <span className="text-xs font-medium text-red-600">
            {error.errorMessage}
          </span>
        )}
      </div>
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
            type="text"
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
            name="province"
            type="text"
            className={inputClassName}
            placeholder="province"
            value={province}
            onChange={onChangeInputHandler}
          />
        </div>
        <SelectItems
          name="country"
          options={countryOption}
          value={country}
          onChange={countryChangeHandler}
          className={`${inputClassName} !p-0`}
          placeholder="COUNTRY"
        />
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
