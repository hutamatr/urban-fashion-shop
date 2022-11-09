import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CgShoppingCart } from "react-icons/cg";

const CartBadge = ({ onCartItems, className }) => {
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    if (onCartItems) {
      setBadgePulse(true);
    }
    const timer = setTimeout(() => {
      setBadgePulse(false);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [onCartItems]);

  return (
    <Link
      to={"/cart"}
      className={`relative flex items-center justify-center ${className}`}
    >
      <span
        className={`absolute -top-1 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-dark-brown text-xs font-semibold text-white-bone sm:-top-3 ${
          onCartItems < 1 ? "hidden" : "block"
        } ${badgePulse ? "animate-pulse" : ""}`}
      >
        {onCartItems}
      </span>
      <CgShoppingCart className="text-2xl text-dark-brown" />
    </Link>
  );
};

export default CartBadge;
