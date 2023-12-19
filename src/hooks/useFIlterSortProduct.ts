import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@store/store';

const useFIlterSortProduct = () => {
  const [filterValue, setFilterValue] = useState('all');
  const {
    products,
    status: productStatus,
    errorMessage: productErrorMessage,
  } = useAppSelector((state) => state.products);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const isSortedProductList = queryParams.get('sort') === 'low-to-high';

  const sortProductsByPrice = useMemo(() => {
    const sortedProducts = products?.products
      ?.slice()
      ?.sort((productA, productB) => {
        const { price: priceA } = productA;
        const { price: priceB } = productB;
        return isSortedProductList ? +priceA - +priceB : +priceB - +priceA;
      });
    return sortedProducts;
  }, [isSortedProductList, products?.products]);

  const FilterProductHandler = useMemo(() => {
    if (filterValue === 'all') return sortProductsByPrice;
    const filteredProducts = sortProductsByPrice?.filter(
      (product) => product.category.category_name === filterValue
    );
    return filteredProducts;
  }, [filterValue, sortProductsByPrice]);

  return {
    filterValue,
    setFilterValue,
    FilterProductHandler,
    productStatus,
    productErrorMessage,
    isSortedProductList,
  };
};

export default useFIlterSortProduct;
