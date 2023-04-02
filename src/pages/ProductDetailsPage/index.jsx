import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Review from 'components/ProductDetails/Review';
import ProductDetail from 'components/ProductDetails/ProductDetail';
import OtherProduct from 'components/ProductDetails/OtherProduct';
import AddToCartModal from 'components/ProductDetails/AddToCartModal';
import useAxios from 'hooks/useAxios';
import { formatCurrencyOnly } from 'utils/formatCurrency';
import { useCart, useWish, useAuth } from 'hooks/useStoreContext';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isOnWishList, setIsOnWishList] = useState(false);
  const { productId } = useParams();
  const { requestHttp, loading, error } = useAxios();
  const { addItem } = useCart();
  const { addToWishList, deleteWishList } = useWish();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    requestHttp(
      {
        method: 'GET',
        url: `products/${productId}`,
      },
      (data) => setProduct(data)
    );
  }, [requestHttp, productId]);

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

    addItem(itemToOrder);
    setIsModalShow(true);
  }, [addItem, amount, id, image, price, title]);

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
      deleteWishList(id);
    } else {
      addToWishList(product);
    }
  };

  return (
    <>
      {loading.isLoading && (
        <p className='my-[25vh] min-h-[50vh] text-center text-xl font-medium dark:text-white-bone'>
          {loading.loadingMessage}
        </p>
      )}
      {error.isError && (
        <p className='my-[25vh] min-h-[50vh] text-center text-xl font-bold text-red-600'>
          {error.errorMessage}
        </p>
      )}
      {!loading.isLoading && !error.isError && (
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
