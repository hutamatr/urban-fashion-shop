import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { links } from "../Navigation/Navigation";
import useAxios from "../../hooks/useAxios";

const NavigationFooter = () => {
  const [categories, setCategories] = useState([]);

  const { requestHttp } = useAxios();

  useEffect(() => {
    requestHttp(
      {
        method: "GET",
        url: "products/categories",
      },
      (data) => setCategories(data)
    );
  }, [requestHttp]);

  return (
    <section className="flex flex-col border-t border-t-dark-brown p-6 text-center md:w-full md:flex-row md:justify-evenly md:text-start">
      <div className="flex flex-col gap-y-3 uppercase md:gap-y-2">
        <h3 className="font-manrope text-sm font-medium">Category</h3>
        <ul className="flex flex-col gap-y-2 md:gap-y-1">
          {categories.map((category, index) => {
            return index > 0 ? (
              <li key={category}>
                <Link to={`/${category}`} className="font-manrope text-xs">
                  {category}
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-y-3 uppercase md:gap-y-2">
        <h3 className="font-manrope text-sm font-medium">Menu</h3>
        <ul className="flex flex-col gap-y-2 md:gap-y-1">
          {links.map((link, index) => {
            return index < 4 || index > 4 ? (
              <li key={index}>
                <Link to={link.to} className="font-manrope text-xs">
                  {link.name}
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </section>
  );
};

export default NavigationFooter;
