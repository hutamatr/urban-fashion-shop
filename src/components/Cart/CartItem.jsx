import React from 'react';

import { Button, Image, Input } from 'components/UI';
import { formatCurrencyToFixed } from 'utils/formatCurrency';

const CartItem = ({
  id,
  image,
  title,
  amount,
  price,
  onDecrease,
  onIncrease,
  onRemove,
}) => {
  return (
    <li
      key={id}
      className='flex flex-row gap-x-4 border border-dark-brown dark:border-white-bone'
    >
      <Image
        src={image}
        alt={title}
        className='w-32 border-r border-r-dark-brown bg-white object-contain p-4'
        loading='lazy'
      />
      <div className='flex w-full flex-col gap-y-3 p-4'>
        <p className='text-sm font-medium uppercase dark:text-white-bone'>
          {title}
        </p>
        <div className='flex flex-row gap-x-2'>
          <Button
            className='text-2xl font-bold disabled:invisible dark:text-white-bone'
            onClick={onDecrease.bind(null, id)}
            disabled={amount === 1 ? true : false}
          >
            -
          </Button>
          <Input
            type='text'
            value={amount}
            readOnly
            className='max-w-[4rem] rounded p-1 text-center'
          />
          <Button
            className='text-2xl font-bold dark:text-white-bone'
            onClick={onIncrease.bind(null, id)}
          >
            +
          </Button>
        </div>
        <span className='text-sm font-bold text-dark-brown dark:text-white-bone'>
          @ Rp. {formatCurrencyToFixed(price)} x {amount}
        </span>
        <Button
          className='max-w-fit self-end px-3 py-2 text-sm font-semibold duration-300 hover:bg-dark-brown hover:text-white-bone dark:text-white-bone'
          onClick={onRemove.bind(null, id)}
        >
          Remove
        </Button>
      </div>
    </li>
  );
};

export default CartItem;
