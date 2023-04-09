import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import Review from 'components/ProductDetails/Review';
import ProductDetail from 'components/ProductDetails/ProductDetail';
import OtherProduct from 'components/ProductDetails/OtherProduct';
import AddToCartModal from 'components/ProductDetails/AddToCartModal';
import { formatCurrencyOnly } from 'utils/formatCurrency';
import { useStore } from 'store/useStore';

const ProductDetails = () => {
  const [amount, setAmount] = useState(1);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isOnWishList, setIsOnWishList] = useState(false);

  const { productId } = useParams();
  const {
    isAuth,
    addItem: addItemToCart,
    addWishlist,
    deleteWishlist,
    product,
    getProductDetail,
    isLoading,
    isError,
    error,
  } = useStore(
    (state) => ({
      isAuth: state.isAuth,
      addItem: state.addItem,
      addWishlist: state.addWishlist,
      deleteWishlist: state.deleteWishlist,
      product: state.product,
      getProductDetail: state.getProductDetail,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getProductDetail(+productId);
  }, []);

  const { id, image, title, price } = product;

  const decreaseAmountHandler = () => setAmount((prevState) => prevState - 1);
  const increaseAmountHandler = () => setAmount((prevState) => prevState + 1);

  const addToCartHandler = useCallback(() => {
    const priceFormatted = formatCurrencyOnly(price);
    const itemToOrder = {
      id,
      title,
      image,
      price: priceFormatted,
      amount: +amount,
    };

    addItemToCart(itemToOrder);
    setIsModalShow(true);
  }, [addItemToCart, amount, id, image, price, title]);

  const closeModalBackdropHandler = () => {
    setIsModalShow(false);
  };

  const isOnWishListHandler = () => {
    if (isAuth) {
      setIsOnWishList((prevState) => !prevState);
    } else {
      navigate('/login', { replace: true });
    }

    if (isOnWishList) {
      deleteWishlist(id);
    } else {
      addWishlist(product);
    }
  };

  return (
    <>
      {isLoading && (
        <p className='my-[25vh] min-h-[50vh] text-center text-xl font-medium dark:text-white-bone'>
          Loading...
        </p>
      )}
      {isError && (
        <p className='my-[25vh] min-h-[50vh] text-center text-xl font-bold text-red-600'>
          {error.errorMessage}
        </p>
      )}
      {!isLoading && !isError && (
        <ProductDetail
          {...product}
          onDecreaseAmount={decreaseAmountHandler}
          onIncreaseAmount={increaseAmountHandler}
          onAddToCart={addToCartHandler}
          isOnWishList={isOnWishList}
          onIsOnWishlist={isOnWishListHandler}
          amount={amount}
          setAmount={setAmount}
        />
      )}
      <Review />
      <OtherProduct />
      {isModalShow && (
        <AddToCartModal
          onCloseModalHandler={closeModalBackdropHandler}
          {...product}
        />
      )}
    </>
  );
};

export default ProductDetails;
