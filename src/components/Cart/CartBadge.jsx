import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CgShoppingCart } from "react-icons/cg";

const CartBadge = ({ onCartItems }) => {
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    if (onCartItems) {
      setBadgePulse(true);
      setTimeout(() => {
        setBadgePulse(false);
      }, 900);
    }
  }, [onCartItems]);

  return (
    <Link to={"/cart"} className="relative flex items-center justify-center">
      <span
        className={`absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-dark-brown text-xs font-semibold text-white-bone md:hidden ${
          onCartItems < 1 ? "hidden" : "block"
        } ${badgePulse ? "animate-pulse" : ""}`}
      >
        {onCartItems}
      </span>
      <CgShoppingCart className="text-2xl md:hidden" />
    </Link>
  );
};

export default CartBadge;
