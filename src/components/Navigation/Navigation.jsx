import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import { CgMenuRight, CgClose } from "react-icons/cg";

import CartBadge from "../Cart/CartBadge";
import CartContext from "../../store/CartContext";

export const links = [
  { to: "/", name: "Home" },
  { to: "/shop", name: "Shop" },
  { to: "/sale", name: "Sale" },
  { to: "/login", name: "Login" },
];
const Navigation = () => {
  const [menuView, setMenuView] = useState(false);
  const { items } = useContext(CartContext);

  const cartItemsTotal = items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  const menuHandler = () => setMenuView((prevState) => !prevState);

  return (
    <nav className="relative z-[9999] mx-auto flex max-w-6xl flex-row items-center justify-between bg-white-bone p-4 sm:static">
      <Link to={"/"} replace={true} className="flex items-center gap-x-3">
        <h1 className="font-noto text-2xl font-semibold md:translate-x-1/3">
          !unknown
        </h1>
      </Link>
      <div className="flex flex-row gap-x-6">
        <CartBadge onCartItems={cartItemsTotal} className="sm:hidden" />
        <button className="sm:hidden" onClick={menuHandler}>
          {menuView ? (
            <CgClose className="h-6 w-6" />
          ) : (
            <CgMenuRight className="h-6 w-6" />
          )}
        </button>
      </div>
      <ul
        className={`text-neutral-500 absolute top-16 flex w-[35%] flex-col items-start justify-center gap-y-6 rounded-md bg-white-bone py-4 px-6 text-center font-manrope text-sm font-semibold uppercase shadow-md duration-500 sm:static sm:top-0 sm:h-0 sm:w-auto sm:translate-x-0 sm:flex-row sm:items-center sm:gap-x-8 sm:bg-transparent sm:py-0 sm:shadow-none ${
          menuView ? "right-4" : "-right-full"
        }`}
      >
        {links.map((menuLink) => {
          return (
            <li key={menuLink.name}>
              <NavLink
                to={menuLink.to}
                // className={menuIsActive}
                // onClick={menuViewHandler}
              >
                {menuLink.name}
              </NavLink>
            </li>
          );
        })}
        <CartBadge onCartItems={cartItemsTotal} className="hidden sm:block" />
      </ul>
    </nav>
  );
};

export default Navigation;
