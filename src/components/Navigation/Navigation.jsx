import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CgMenuRight, CgClose, CgShoppingCart } from "react-icons/cg";

import NavigationLinks from "./NavigationLinks";

const links = [
  { to: "/shop", name: "Shop" },
  { to: "/sale", name: "Sale" },
  { to: "/contact", name: "Contact" },
  { to: "/about", name: "About" },
  { to: "/login", name: "Login" },
  { to: "/cart", name: "Cart" },
];
const Navigation = () => {
  const [menuView, setMenuView] = useState(false);

  const menuHandler = () => setMenuView((prevState) => !prevState);

  const LinksContent = (number, operator) => {
    const operatorFunc = {
      ">": (x, y) => x > y,
      "<": (x, y) => x < y,
    };
    return links.map((link, index) => {
      return operatorFunc[operator](index, number) ? (
        <NavigationLinks key={index} to={link.to} children={link.name} />
      ) : null;
    });
  };

  return (
    <nav className="fixed top-0 flex w-full flex-row items-center justify-between border-[1.5px] border-dark-brown bg-white-bone p-4 font-manrope text-sm uppercase md:p-0 md:py-1">
      <ul
        className={`absolute top-full right-0 flex min-h-screen min-w-[70%] flex-col items-center gap-y-8 border-[1.5px] border-dark-brown bg-white-bone py-6 duration-500 md:static md:min-h-fit md:min-w-fit md:flex-row md:gap-x-px md:border-none md:bg-transparent md:py-0 md:px-0 ${
          !menuView ? "-right-[100vw]" : ""
        }`}
      >
        {LinksContent(4, "<")}
      </ul>
      <h1 className="font-noto text-2xl font-semibold text-dark-brown md:translate-x-1/3">
        !unknown
      </h1>
      <div className="flex flex-row items-center justify-center gap-x-6">
        <Link to={"/cart"}>
          <CgShoppingCart className="text-2xl text-dark-brown md:hidden" />
        </Link>
        <button onClick={menuHandler}>
          {!menuView ? (
            <CgMenuRight className="text-2xl text-dark-brown md:hidden" />
          ) : (
            <CgClose className="text-2xl text-dark-brown md:hidden" />
          )}
        </button>
      </div>

      <ul
        className={`absolute top-[45vh] right-0 flex min-w-[70%] flex-col-reverse items-center justify-center gap-y-8 py-4 duration-500 md:static md:min-w-fit md:flex-row md:gap-x-px md:py-0 md:px-0 ${
          !menuView ? "-right-[100vw]" : ""
        }`}
      >
        {LinksContent(3, ">")}
      </ul>
    </nav>
  );
};

export default Navigation;
