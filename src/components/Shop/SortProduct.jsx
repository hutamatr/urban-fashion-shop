import React, { useState } from 'react';

const SortProduct = ({ onNavigate, onSortedProduct }) => {
  const [sortProduct, setSortProduct] = useState('');

  const sortProductHandler = (event) => {
    setSortProduct(event.target.value);
    onNavigate({
      search: `?sort=${onSortedProduct ? 'high-to-low' : 'low-to-high'}`,
    });
  };

  return (
    <form className='flex max-w-full items-center justify-end gap-x-4 p-4'>
      <select
        name='sort'
        id='sort'
        onChange={sortProductHandler}
        value={sortProduct}
        className='text-md cursor-pointer border-none bg-white-bone uppercase outline-none ring-0 dark:bg-dark-brown dark:text-white-bone'
      >
        {onSortedProduct ? (
          <>
            <option value='low-to-high'>Price Low to High</option>
            <option value='high-to-low'>Price High to Low</option>
          </>
        ) : (
          <>
            <option value='high-to-low'>Price High to Low</option>
            <option value='low-to-high'>Price Low to High</option>
          </>
        )}
      </select>
    </form>
  );
};

export default SortProduct;
