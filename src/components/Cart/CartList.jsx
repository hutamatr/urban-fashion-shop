import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CartItem from './CartItem';
import { useCart } from 'hooks/useStoreContext';
import { Button } from 'components/UI';

const CartList = () => {
  const { items, addItem, decreaseItem, deleteItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const gotoShopHandler = () => navigate('/shop', { replace: true });

  const increaseItemHandler = (id) => {
    const newItem = items.find((item) => item.id === id);
    addItem({
      ...newItem,
      amount: 1,
    });
  };
  const decreaseItemHandler = (id) => {
    decreaseItem(id);
  };

  const removeCartHandler = (id) => {
    deleteItem(id);
  };

  return (
    <>
      {items.length < 1 ? (
        <div className='flex flex-col items-center justify-center'>
          <span className='my-6 grid place-items-center text-xl font-semibold dark:text-white-bone'>
            Cart Empty
          </span>
          <Button
            className='bg-dark-brown py-2 px-6 text-white-bone dark:bg-white-bone dark:text-dark-brown'
            onClick={gotoShopHandler}
          >
            Shop
          </Button>
        </div>
      ) : (
        <ul className='flex max-h-screen flex-col gap-y-4 overflow-auto'>
          {items.map((item) => {
            return (
              <CartItem
                {...item}
                key={item.id}
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
};

export default CartList;
