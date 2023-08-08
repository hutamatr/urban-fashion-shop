import clsx from 'clsx';
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

interface ISortProductProps {
  onNavigate: NavigateFunction;
  onSortedProduct: boolean;
}

export default function SortProduct({
  onNavigate,
  onSortedProduct,
}: ISortProductProps) {
  const [sortProduct, setSortProduct] = useState('');

  const sortProductHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortProduct(event.target.value);
    onNavigate({
      search: `?sort=${onSortedProduct ? 'high-to-low' : 'low-to-high'}`,
    });
  };

  return (
    <form className='mb-4 flex w-fit items-center justify-end gap-x-1'>
      <span
        className={clsx(
          'text-sm text-dark-brown',
          'dark:text-white-bone',
          'md:text-base'
        )}
      >
        Sort By:
      </span>
      <select
        name='sort'
        id='sort'
        onChange={sortProductHandler}
        value={sortProduct}
        className={clsx(
          'm-0 cursor-pointer border-none bg-white-bone p-0 text-sm outline-none ring-0',
          'dark:bg-dark-brown dark:text-white-bone',
          'md:text-base'
        )}
      >
        {onSortedProduct ? (
          <>
            <option value='low-to-high'>Price - Low to High</option>
            <option value='high-to-low'>Price - High to Low</option>
          </>
        ) : (
          <>
            <option value='high-to-low'>Price - High to Low</option>
            <option value='low-to-high'>Price - Low to High</option>
          </>
        )}
      </select>
    </form>
  );
}
