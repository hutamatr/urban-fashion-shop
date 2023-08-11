import { useCallback, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import AddToCartModal from '@components/ProductDetails/AddToCartModal';
import OtherProduct from '@components/ProductDetails/OtherProduct';
import ProductDetail from '@components/ProductDetails/ProductDetail';
import Review from '@components/ProductDetails/Review';
import Loading from '@components/UI/Loading';

import { addToCart } from '@store/cartSlice';
import { fetchAllProducts } from '@store/productSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { addWishlist, removeWishlist } from '@store/wishlistSlice';

import { INewProductToCart, IProduct, IProductData } from 'types/types';

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isOnWishList, setIsOnWishList] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { product, status, errorMessage } = useAppSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { wishlist } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlist.find((item) => item.id === product?.data.id)) {
      setIsOnWishList(true);
    } else {
      setIsOnWishList(false);
    }
  }, [product?.data.id, wishlist]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (productId) {
      dispatch(fetchAllProducts(productId));
    }
  }, [productId, dispatch]);

  const decreaseQuantityHandler = () =>
    setQuantity((prevState) => prevState - 1);
  const increaseQuantityHandler = () =>
    setQuantity((prevState) => prevState + 1);

  const addToCartHandler = useCallback(() => {
    const itemToCart: INewProductToCart = {
      // product_id: product?.data.id as number,
      // price: product?.data.attributes.price as string,
      quantity: +quantity,
      product: product?.data as IProduct,
    };
    dispatch(addToCart(itemToCart));
    setIsModalShow(true);
  }, [quantity, product?.data, dispatch]);

  const closeModalBackdropHandler = () => {
    setIsModalShow(false);
  };

  const isOnWishListHandler = () => {
    if (isAuthenticated) {
      setIsOnWishList((prevState) => !prevState);
    } else {
      navigate('/login', { replace: true });
    }

    if (isOnWishList) {
      dispatch(removeWishlist(product?.data.id as number));
      toast.success('Removed from wishlist', { duration: 3000 });
    } else {
      dispatch(addWishlist(product?.data as IProduct));
      toast.success('Added to wishlist', { duration: 3000 });
    }
  };

  return (
    <>
      <Toaster position='top-center' />
      {status === 'pending' && <Loading />}
      {status === 'rejected' && (
        <p className='my-[25vh] min-h-[50vh] text-center text-xl font-bold text-red-600'>
          {errorMessage}
        </p>
      )}
      {status === 'fulfilled' && (
        <ProductDetail
          {...(product as IProductData)}
          onDecreaseQuantity={decreaseQuantityHandler}
          onIncreaseQuantity={increaseQuantityHandler}
          onAddToCart={addToCartHandler}
          isOnWishList={isOnWishList}
          onIsOnWishlist={isOnWishListHandler}
          quantity={quantity}
        />
      )}
      <Review />
      <OtherProduct />
      {isModalShow && (
        <AddToCartModal
          onCloseModalHandler={closeModalBackdropHandler}
          {...(product as IProductData)}
        />
      )}
    </>
  );
}
