import { Link } from 'react-router-dom';

import { Figure } from '@components/UI';

import { IProduct } from 'types/types';

interface IProductItemProps {
  product: IProduct;
  linkTo: string;
}

export default function ProductItem({ product, linkTo }: IProductItemProps) {
  return (
    <li>
      <Link to={linkTo}>
        <Figure product={product} classImage='' />
      </Link>
    </li>
  );
}
