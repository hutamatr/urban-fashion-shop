import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import DropdownNav from "./DropdownNav";
import CartBadge from "../Cart/CartBadge";
import { useCart, useAuth } from "../../hooks/useStoreContext";

import { CgMenuRight, CgClose } from "react-icons/cg";

const Navigation = () => {
  const [menuView, setMenuView] = useState(false);
  const { items } = useCart();
  const { isAuth } = useAuth();

  const cartItemsTotal = items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  const menuHandler = () => setMenuView((prevState) => !prevState);
  const menuViewClose = () => setMenuView(false);

  return (
    <nav className="relative mx-auto flex max-w-6xl flex-row items-center justify-between bg-white-bone p-4 sm:static">
      <Link to={"/"} replace={true} className="flex items-center gap-x-3">
        <h1 className="font-noto text-2xl font-semibold">!unknown</h1>
      </Link>
      <div className="flex flex-row gap-x-6">
        <CartBadge onCartItems={cartItemsTotal} className="sm:hidden" />
        {isAuth && <DropdownNav className="sm:hidden" />}
        <button className="sm:hidden" onClick={menuHandler}>
          {menuView ? (
            <CgClose className="h-6 w-6" />
          ) : (
            <CgMenuRight className="h-6 w-6" />
          )}
        </button>
      </div>
      <ul
        className={`absolute right-0 top-16 flex min-h-[50vh] w-[100vw] flex-col items-center gap-y-6 rounded-b-xl bg-white-bone py-4 px-6 text-center font-manrope text-sm font-semibold uppercase text-neutral-500 shadow-md duration-700 sm:static sm:top-0 sm:min-h-0 sm:w-auto sm:translate-x-0 sm:flex-row sm:items-center sm:gap-x-8 sm:bg-transparent sm:py-0 sm:opacity-100 sm:shadow-none ${
          menuView ? "top-0" : "-top-[100vh] opacity-0"
        }`}
      >
        <li
          onClick={menuViewClose}
          className="w-fit px-2 py-1 text-dark-brown duration-300 hover:bg-dark-brown hover:text-white-bone"
        >
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li
          onClick={menuViewClose}
          className="w-fit px-2 py-1 text-dark-brown duration-300 hover:bg-dark-brown hover:text-white-bone"
        >
          <NavLink to={"/shop"}>Shop</NavLink>
        </li>

        {!isAuth && (
          <li
            onClick={menuViewClose}
            className="w-fit px-2 py-1 text-dark-brown duration-300 hover:bg-dark-brown hover:text-white-bone"
          >
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        )}

        <CartBadge onCartItems={cartItemsTotal} className="hidden sm:block" />

        {isAuth && (
          <li>
            <DropdownNav
              onCloseMenu={menuViewClose}
              className="hidden sm:block"
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
