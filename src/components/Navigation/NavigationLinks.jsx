import React from "react";
import { Link } from "react-router-dom";

const NavigationLinks = ({ to, children }) => {
  return (
    <li>
      <Link
        className="rounded-full py-2 px-4 font-semibold ring-1 ring-dark-brown duration-300 hover:bg-dark-brown hover:text-white-bone"
        to={to}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavigationLinks;
