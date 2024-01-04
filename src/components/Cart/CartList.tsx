import clsx from 'clsx';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  addToCart,
  decreaseFromCart,
  deleteCartItem,
  removeFromCart,
  updateCartItem,
} from '@store/cartSlice';
import { useAppDispatch, useAppSelector } from '@store/store';

import CartItem from './CartItem';

interface ICartListProps {
  cartItems: IProductCart[];
}

export default function CartList({ cartItems }: Readonly<ICartListProps>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { wishlists } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const gotoShopHandler = () => navigate('/shop', { replace: true });

  const isInWishlistHandler = (productId: number) => {
    return wishlists?.some((wishlist) => wishlist.product_id === productId);
  };

  const increaseItemHandler = (id: number) => {
    const newItem = cartItems.find((item) => item.id === id);

    dispatch(
      addToCart({ ...(newItem as IProductCart), cart_item: { quantity: 1 } })
    );
    debounce(() => {
      dispatch(
        updateCartItem({
          productId: id,
          plus: 1,
        })
      );
    }, 1500)();
  };
  const decreaseItemHandler = (id: number) => {
    dispatch(decreaseFromCart(id));
    debounce(() => {
      dispatch(
        updateCartItem({
          productId: id,
          minus: 1,
        })
      );
    }, 1500)();
  };

  const removeCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
    dispatch(deleteCartItem({ productId: id }));
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
          {cartItems?.map((item) => {
            return (
              <CartItem
                product={item}
                quantity={item.cart_item.quantity}
                key={item.id}
                onIncrease={increaseItemHandler}
                onDecrease={decreaseItemHandler}
                onRemove={removeCartHandler}
                onWishlistHandler={isInWishlistHandler}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
