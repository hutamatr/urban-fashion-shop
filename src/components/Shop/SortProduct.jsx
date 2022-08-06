import React, { useState } from "react";

const SortProduct = ({ onNavigate, onSortedProduct }) => {
  const [sortProduct, setSortProduct] = useState("");

  const sortProductHandler = (event) => {
    setSortProduct(event.target.value);
    onNavigate({
      search: `?sort=${onSortedProduct ? "high-to-low" : "low-to-high"}`,
    });
  };

  return (
    <form className="flex max-w-full items-center justify-center gap-x-4 border-b border-b-dark-brown py-4">
      <select
        name="sort"
        id="sort"
        onChange={sortProductHandler}
        value={sortProduct}
        className="text-md cursor-pointer bg-white-bone uppercase"
      >
        {onSortedProduct ? (
          <>
            <option value="low-to-high">Price Low to High</option>
            <option value="high-to-low">Price High to Low</option>
          </>
        ) : (
          <>
            <option value="high-to-low">Price High to Low</option>
            <option value="low-to-high">Price Low to High</option>
          </>
        )}
      </select>
    </form>
  );
};

export default SortProduct;
