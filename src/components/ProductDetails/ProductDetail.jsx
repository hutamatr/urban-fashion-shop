import React from 'react';

import { Button, Image, Input } from 'components/UI';
import { formatCurrency } from 'utils/formatCurrency';

import { MdFavoriteBorder, MdFavorite, MdOutlineStar } from 'react-icons/md';

const ProductDetail = ({
  title,
  rating,
  image,
  price,
  category,
  description,
  amount,
  onDecreaseAmount,
  onIncreaseAmount,
  onAddToCart,
  isOnWishList,
  onIsOnWishlist,
  setAmount,
}) => {
  return (
    <section className='grid grid-cols-1 border-b border-b-dark-brown dark:border-b-white-bone md:grid-cols-2 md:items-center'>
      <Image
        src={image}
        alt={title}
        className='md: h-52 w-full bg-white object-contain object-center p-4 md:h-72'
        loading='lazy'
      />
      <div className='flex flex-col items-start justify-center gap-y-6 p-5 text-dark-brown'>
        <div className='flex flex-col gap-y-2 dark:text-white-bone'>
          <h1 className='text-2xl font-semibold uppercase'>{title}</h1>
          <span className='flex items-center'>
            <MdOutlineStar /> {rating?.rate} ({rating?.count})
          </span>
        </div>
        <span className='font-semibold dark:text-white-bone'>
          Rp. {`${price ? formatCurrency(price) : '-'}`}
        </span>
        <div className='flex flex-col-reverse gap-y-4 md:w-full md:flex-row md:items-center md:justify-between'>
          <div className='flex max-w-fit border-2 border-dark-brown dark:border-white-bone'>
            <Button
              onClick={onDecreaseAmount}
              className='py-2 px-4 text-lg font-bold dark:text-white-bone'
            >
              -
            </Button>
            <Input
              type='text'
              value={amount < 1 ? setAmount(1) : amount}
              min='1'
              max='10'
              readOnly
              className='h-full w-10 border-none bg-white-bone text-center dark:bg-dark-brown dark:text-white-bone'
            />
            <Button
              onClick={onIncreaseAmount}
              className='py-2 px-4 text-lg font-bold dark:text-white-bone'
            >
              +
            </Button>
          </div>

          <Button
            className='flex items-center gap-x-2 rounded-sm bg-dark-brown py-[.75rem] px-2 text-white-bone dark:bg-white-bone dark:text-dark-brown'
            onClick={onIsOnWishlist}
          >
            {isOnWishList ? (
              <>
                <MdFavorite className='text-2xl dark:text-dark-brown' />
                On Wishlist
              </>
            ) : (
              <>
                <MdFavoriteBorder className='text-2xl dark:text-dark-brown' />
                Add to Wishlist
              </>
            )}
          </Button>
        </div>
        <p className='text-sm dark:text-white-bone'>{description}</p>
        <span className='text-xs font-medium uppercase dark:text-white-bone'>
          Category : {category}
        </span>
        <Button
          className='w-full border border-dark-brown py-3 font-medium uppercase duration-300 hover:bg-dark-brown hover:text-white-bone dark:border-white-bone dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown'
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </section>
  );
};

export default ProductDetail;
