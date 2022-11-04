import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineStar } from "react-icons/md";

import Review from "../components/ProductDetails/Review";
import OtherProduct from "../components/ProductDetails/OtherProduct";
import { formatCurrencyOnly, formatCurrency } from "../utils/formatCurrency";
import useAxios from "../hooks/useAxios";
import { useCart } from "../hooks/useStoreContext";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const { productId } = useParams();
  const { requestHttp, loading, error } = useAxios();
  const { addItem } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestHttp(
      {
        method: "GET",
        url: `products/${productId}`,
      },
      (data) => setProduct(data)
    );
  }, [requestHttp, productId]);

  const { id, image, title, rating, price, description, category } = product;

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
  }, [addItem, amount, id, image, price, title]);

  return (
    <>
      {loading.isLoading ? (
        <p className="my-[25vh] min-h-[50vh] text-center text-xl font-medium">
          {loading.loadingMessage}
        </p>
      ) : error.isError ? (
        <p className="my-[25vh] min-h-[50vh] text-center text-xl font-bold text-red-600">
          {error.errorMessage}
        </p>
      ) : (
        <section className="grid grid-cols-1 border-b border-b-dark-brown md:grid-cols-2 md:items-center">
          <img
            src={image}
            alt=""
            className="md: h-52 w-full bg-white object-contain object-center p-4 md:h-72"
          />
          <div className="flex flex-col items-start justify-center gap-y-6 p-5 text-dark-brown">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-semibold uppercase">{title}</h1>
              <span className="flex items-center">
                <MdOutlineStar /> {rating?.rate} ({rating?.count})
              </span>
            </div>
            <span className="font-semibold">
              Rp. {`${price ? formatCurrency(price) : "-"}`}
            </span>
            <div className="flex max-w-fit border-2 border-dark-brown">
              <button
                onClick={decreaseAmountHandler}
                className="py-2 px-4 text-lg font-bold"
              >
                -
              </button>
              <form action="">
                <input
                  type="text"
                  value={amount < 1 ? setAmount(1) : amount}
                  min="1"
                  max="10"
                  readOnly
                  className="h-full w-10 border-none bg-white-bone text-center"
                />
              </form>
              <button
                onClick={increaseAmountHandler}
                className="py-2 px-4 text-lg font-bold"
              >
                +
              </button>
            </div>
            <p className="text-sm">{description}</p>
            <span className="text-xs font-medium uppercase">
              Category : {category}
            </span>
            <button
              className="w-full border border-dark-brown py-3 font-medium uppercase duration-300 hover:bg-dark-brown hover:text-white-bone"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </section>
      )}
      <Review />
      <OtherProduct />
    </>
  );
};

export default ProductDetails;
