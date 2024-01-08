import { useCallback, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import AddToCartModal from '@components/ProductDetails/AddToCartModal';
import OtherProduct from '@components/ProductDetails/OtherProduct';
import ProductDetail from '@components/ProductDetails/ProductDetail';
import ProductDetailSkeleton from '@components/ProductDetails/ProductDetailSkeleton';
import Review from '@components/ProductDetails/Review';

import { addToCart, postCartItem } from '@store/cart.slice';
import { showModalHandler } from '@store/modal.slice';
import { fetchProducts } from '@store/product.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  deleteWishlist,
  getWishlist,
  postWishlist,
} from '@store/wishlist.slice';

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {
    product,
    status: productStatus,
    errorMessage,
  } = useAppSelector((state) => state.products);
  const { isAuth } = useAppSelector((state) => state.auth);
  const { isModalShow } = useAppSelector((state) => state.modal);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    dispatch(
      fetchProducts({
        skip: 0,
        limit: 0,
        productId: Number(productId as string),
      })
    );
  }, [dispatch, productId]);

  useEffect(() => {
    const getWishlistData = async () => {
      if (isAuth) {
        const wishlistData = await dispatch(
          getWishlist(Number(productId as string))
        );
        if (wishlistData.meta.requestStatus === 'fulfilled') {
          setIsWishlist(true);
        }
        if (wishlistData.meta.requestStatus === 'rejected') {
          setIsWishlist(false);
        }
      }
    };

    getWishlistData();
  }, [dispatch, isAuth, productId]);

  const decreaseQuantityHandler = () => {
    setQuantity((prevState) => prevState - 1);
  };

  const increaseQuantityHandler = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const addToCartHandler = useCallback(() => {
    const itemToCart: IProductCart = {
      id: product?.product.id as number,
      title: product?.product.title as string,
      description: product?.product.description as string,
      image_url: product?.product.image_url as string,
      price: product?.product.price as number,
      discount_percentage: product?.product.discount_percentage as number,
      discounted_price: product?.product.discounted_price as number,
      stock_quantity: product?.product.stock_quantity as number,
      cart_item: {
        quantity: quantity,
      },
    };
    dispatch(addToCart(itemToCart));
    dispatch(showModalHandler());
    dispatch(
      postCartItem({
        product_id: product?.product.id as number,
        quantity: quantity,
      })
    );
  }, [quantity, product?.product, dispatch]);

  const closeModalBackdropHandler = () => {
    dispatch(showModalHandler());
  };

  const isWishlistHandler = () => {
    if (!isAuth) {
      navigate('/signin', { replace: true });
      setTimeout(() => {
        toast.error('Please login first', { duration: 3000 });
      }, 1000);
      return;
    }

    if (isWishlist) {
      setIsWishlist(false);
      dispatch(deleteWishlist(product?.product.id as number));
      toast.success('Removed from wishlist', { duration: 3000 });
    } else {
      setIsWishlist(true);
      dispatch(postWishlist({ product_id: product?.product.id as number }));
      toast.success('Added to wishlist', { duration: 3000 });
    }
  };

  return (
    <>
      <Toaster position='top-center' />
      {productStatus === 'pending' && <ProductDetailSkeleton />}
      {productStatus === 'rejected' && (
        <p className='my-[25vh] min-h-[50vh] text-center text-xl font-bold text-red-600'>
          {errorMessage}
        </p>
      )}
      {productStatus === 'fulfilled' && (
        <ProductDetail
          product={product?.product as IProduct}
          onDecreaseQuantity={decreaseQuantityHandler}
          onIncreaseQuantity={increaseQuantityHandler}
          onAddToCart={addToCartHandler}
          isWishlist={isWishlist}
          onIsOnWishlist={isWishlistHandler}
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
