import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import countryList from "react-select-country-list";

import { useCart, useAuth } from "../../hooks/useStoreContext";
import useFormState from "../../hooks/useFormState";
import useAxios from "../../hooks/useAxios";
import TotalPricesOrder from "./TotalPricesOrder";
import SelectItems from "../UI/SelectItems";
import Button from "../UI/Button";
import Input from "../UI/Input";

const inputClassName =
  "w-full rounded-sm border-2 border-dark-brown bg-white-bone p-2 text-sm font-medium outline-none placeholder:text-sm focus:border-dark-brown focus:ring-0 placeholder:uppercase";

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

  const orderHandler = () => {
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
        <h3 className="text-lg font-semibold dark:text-white-bone">
          Shipping detail
        </h3>
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
            required={true}
          />
          <Input
            name="email"
            type="email"
            className={inputClassName}
            value={email}
            placeholder="email"
            onChange={onChangeInputHandler}
            required={true}
          />
          <Input
            name="street"
            type="text"
            className={inputClassName}
            placeholder="street"
            value={street}
            onChange={onChangeInputHandler}
            required={true}
          />
          <Input
            name="phone"
            type="text"
            className={inputClassName}
            placeholder="phone"
            value={phone}
            onChange={onChangeInputHandler}
            required={true}
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
            required={true}
          />
          <Input
            name="city"
            type="text"
            className={inputClassName}
            placeholder="city"
            value={city}
            onChange={onChangeInputHandler}
            required={true}
          />
          <Input
            name="province"
            type="text"
            className={inputClassName}
            placeholder="province"
            value={province}
            onChange={onChangeInputHandler}
            required={true}
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
        <TotalPricesOrder
          totalCartItems={totalCartItems}
          totalPriceAmount={totalPriceAmount}
        />
        <Button
          className={
            "!bg-dark-brown py-3 text-white-bone disabled:cursor-not-allowed dark:!bg-white-bone dark:text-dark-brown"
          }
          disabled={totalCartItems < 1}
          onClick={orderHandler}
          type="submit"
        >
          Checkout
        </Button>
      </form>
    </section>
  );
};

export default ShoppingSummary;
