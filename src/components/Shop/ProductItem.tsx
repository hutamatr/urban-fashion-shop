import { useNavigate } from 'react-router-dom';

import { Figure } from '@components/UI';

import { useAppDispatch } from '@store/store';
import { getWishlist } from '@store/wishlistSlice';

import { IProduct } from 'types/types';

interface IProductItemProps {
  product: IProduct;
}

export default function ProductItem({ product }: Readonly<IProductItemProps>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const viewProductHandler = () => {
    dispatch(getWishlist(product.id));
    navigate(`/shop/${product.id}`);
  };

  return (
    <li>
      <button onClick={viewProductHandler}>
        <Figure product={product} />
      </button>
    </li>
  );
}
