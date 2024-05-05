import clsx from 'clsx';

import { useAppSelector } from '@store/store';

import { capitalizeWords } from '@utils/formatted';

interface IFilterProductProps {
  filterValue: string;
  onFilteredProductValue: (_value: string) => void;
}

export default function FilterProduct({
  filterValue,
  onFilteredProductValue,
}: Readonly<IFilterProductProps>) {
  const { categories } = useAppSelector((state) => state.products);

  const FilterProductHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onFilteredProductValue(event.target.value);
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
        Filter:
      </span>
      <select
        name='sort'
        id='sort'
        onChange={FilterProductHandler}
        value={filterValue}
        className={clsx(
          'm-0 cursor-pointer border-none bg-white-bone p-0 text-sm outline-none ring-0',
          'dark:bg-dark-brown dark:text-white-bone',
          'md:text-base'
        )}
      >
        <option value='all'>All</option>
        {categories?.categories?.map((category) => (
          <option key={category.id} value={category.category_name}>
            {capitalizeWords(category.category_name)}
          </option>
        ))}
      </select>
    </form>
  );
}
