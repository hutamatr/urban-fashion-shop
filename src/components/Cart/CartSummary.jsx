import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import countryList from 'react-select-country-list';
import { shallow } from 'zustand/shallow';

import useFormState from 'hooks/useFormState';
import TotalPricesOrder from './TotalPricesOrder';
import { SelectItems, Button, Input } from 'components/UI';
import { useStore } from 'store/useStore';

const inputClassName =
  'w-full rounded-sm border-2 border-dark-brown bg-white-bone p-2 text-sm font-medium outline-none placeholder:text-sm focus:border-dark-brown focus:ring-0 placeholder:uppercase';

const CartSummary = ({ totalCartItems }) => {
  const [country, setCountry] = useState('');
  const { input, setInput, onChangeInputHandler } = useFormState({
    fullName: '',
    email: '',
    street: '',
    phone: '',
    zipCode: '',
    city: '',
    province: '',
  });

  const { isAuth, totalPriceAmount, user, getUser, isLoading, isError, error } =
    useStore(
      (state) => ({
        isAuth: state.isAuth,
        totalPriceAmount: state.totalPriceAmount,
        user: state.user,
        getUser: state.getUser,
        isLoading: state.isLoading,
        isError: state.isError,
        error: state.error,
      }),
      shallow
    );
  const navigate = useNavigate();
  const countryOption = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('decode'));
    if (userId) {
      getUser();
      const {
        name: { firstname, lastname },
        email,
        address: { city, number, street, zipcode },
        phone,
      } = user;
      setInput((prevState) => ({
        ...prevState,
        email,
        phone,
        city,
        fullName: `${firstname} ${lastname}`,
        street: `${street}, ${number}`,
        zipCode: zipcode,
      }));
    } else {
      return;
    }
  }, [setInput]);

  const { fullName, email, street, phone, zipCode, city, province } = input;

  const countryChangeHandler = (value) => {
    setCountry(value);
  };

  const formOrderHandler = (event) => {
    event.preventDefault();

    if (isAuth) {
      // Handling Order
    } else {
      navigate('/login');
    }

    setInput({
      fullName: '',
      email: '',
      street: '',
      phone: '',
      zipCode: '',
      city: '',
      province: '',
    });
    setCountry('');
  };

  return (
    <section className='flex flex-col gap-y-4'>
      <div className='flex flex-row items-center gap-x-4'>
        <h3 className='text-lg font-semibold dark:text-white-bone'>
          Shipping detail
        </h3>
        {isLoading && <Spinner aria-label='Default status example' />}
        {isError && (
          <span className='text-xs font-medium text-red-600'>
            {error.errorMessage}
          </span>
        )}
      </div>
      <form className='flex flex-col gap-y-3' onSubmit={formOrderHandler}>
        <div className='grid w-full grid-cols-2 gap-2'>
          <Input
            name='fullName'
            type='text'
            className={inputClassName}
            placeholder='full name'
            value={fullName}
            onChange={onChangeInputHandler}
            required={true}
          />
          <Input
            name='email'
            type='email'
            className={inputClassName}
            value={email}
            placeholder='email'
            onChange={onChangeInputHandler}
            required={true}
          />
          <Input
            name='street'
            type='text'
            className={inputClassName}
            placeholder='street'
            value={street}
            onChange={onChangeInputHandler}
            required={true}
          />
          <Input
            name='phone'
            type='text'
            className={inputClassName}
            placeholder='phone'
            value={phone}
            onChange={onChangeInputHandler}
            required={true}
          />
        </div>
        <div className=' flex flex-row items-center gap-x-2'>
          <Input
            name='zipCode'
            type='text'
            className={inputClassName}
            placeholder='zipcode'
            value={zipCode}
            onChange={onChangeInputHandler}
            required={true}
          />
          <Input
            name='city'
            type='text'
            className={inputClassName}
            placeholder='city'
            value={city}
            onChange={onChangeInputHandler}
            required={true}
          />
          <Input
            name='province'
            type='text'
            className={inputClassName}
            placeholder='province'
            value={province}
            onChange={onChangeInputHandler}
            required={true}
          />
        </div>
        <SelectItems
          name='country'
          options={countryOption}
          value={country}
          onChange={countryChangeHandler}
          className={`${inputClassName} !p-0`}
          placeholder='COUNTRY'
        />
        <TotalPricesOrder
          totalCartItems={totalCartItems}
          totalPriceAmount={totalPriceAmount}
        />
        <Button
          className='!bg-dark-brown py-3 text-white-bone disabled:cursor-not-allowed dark:!bg-white-bone dark:text-dark-brown'
          disabled={totalCartItems < 1}
          type='submit'
        >
          Checkout
        </Button>
      </form>
    </section>
  );
};

export default CartSummary;
