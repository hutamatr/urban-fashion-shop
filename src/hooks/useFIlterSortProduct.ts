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
        const { discounted_price: discountedPriceA } = productA;
        const { discounted_price: discountedPriceB } = productB;
        return isSortedProductList
          ? discountedPriceA - discountedPriceB
          : discountedPriceB - discountedPriceA;
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
