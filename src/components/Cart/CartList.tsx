import clsx from 'clsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { addToCart, decreaseFromCart, removeFromCart } from '@store/cartSlice';
import { useAppDispatch } from '@store/store';

import CartItem from './CartItem';

import { INewProductToCart } from 'types/types';

interface ICartListProps {
  cartItems: INewProductToCart[];
}

export default function CartList({ cartItems }: ICartListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const gotoShopHandler = () => navigate('/shop', { replace: true });

  const increaseItemHandler = (id: number) => {
    const newItem = cartItems.find((item) => item.product_id === id);
    dispatch(addToCart({ ...newItem, quantity: 1 } as INewProductToCart));
  };
  const decreaseItemHandler = (id: number) => {
    dispatch(decreaseFromCart(id));
  };

  const removeCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      {cartItems?.length < 1 ? (
        <div className='flex flex-col items-center justify-center'>
          <span
            className={clsx(
              'my-6 grid place-items-center text-xl font-semibold',
              'dark:text-white-bone'
            )}
          >
            Cart Empty
          </span>
          <button
            className={clsx(
              'bg-dark-brown px-6 py-2 text-white-bone',
              'dark:bg-white-bone dark:text-dark-brown'
            )}
            onClick={gotoShopHandler}
          >
            Shop
          </button>
        </div>
      ) : (
        <ul className='flex max-h-screen flex-col gap-y-4 overflow-auto'>
          {cartItems.map((item) => {
            return (
              <CartItem
                {...item}
                key={item.product_id}
                onIncrease={increaseItemHandler}
                onDecrease={decreaseItemHandler}
                onRemove={removeCartHandler}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
