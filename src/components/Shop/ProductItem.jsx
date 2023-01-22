import React from 'react';
import { Link } from 'react-router-dom';

import { Figure } from 'components/UI';

const ProductItem = ({ product, linkTo }) => {
  return (
    <li>
      <Link to={linkTo}>
        <Figure
          {...product}
          classImage='object-contain h-52 w-48 bg-white object-center p-4'
        />
      </Link>
    </li>
  );
};

export default ProductItem;
