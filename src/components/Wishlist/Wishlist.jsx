import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useWish } from "../../hooks/useStoreContext";
import Figure from "../UI/Figure";
import Button from "../UI/Button";

const Wishlist = () => {
  const { wishListItems, deleteWishList } = useWish();
  const navigate = useNavigate();

  const gotoShopHandler = () => {
    navigate("/shop");
  };

  const deleteItemWishlistHandler = (id) => {
    deleteWishList(id);
  };

  return (
    <>
      <section className="flex min-h-[30vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6 dark:border-b-white-bone md:min-h-fit md:py-12">
        <h1 className="font-noto text-3xl uppercase dark:text-white-bone md:text-4xl">
          Wishlist
        </h1>
      </section>
      <section className="min-h-screen">
        {wishListItems.length < 1 ? (
          <div className="flex flex-col items-center justify-center">
            <span className="my-6 grid place-items-center text-xl font-semibold dark:text-white-bone">
              Wishlist Empty
            </span>
            <button
              className="bg-dark-brown py-2 px-6 text-white-bone dark:bg-white-bone dark:font-medium dark:text-dark-brown"
              onClick={gotoShopHandler}
            >
              Shop
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4 bg-white-bone p-6 dark:bg-dark-brown sm:grid-cols-3 md:gap-16 lg:grid-cols-4">
            {wishListItems.map((item) => {
              return (
                <li key={item.id} className="">
                  <Link to={`/shop/${item.id}`}>
                    <Figure
                      {...item}
                      classImage="object-contain h-52 w-48 bg-white object-center p-4"
                    />
                  </Link>
                  {/* <Button
                    onClick={deleteItemWishlistHandler.bind(null, item.id)}
                    className="my-2 mx-auto block !bg-dark-brown py-1 px-3 text-white-bone"
                  >
                    Delete
                  </Button> */}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
};

export default Wishlist;
