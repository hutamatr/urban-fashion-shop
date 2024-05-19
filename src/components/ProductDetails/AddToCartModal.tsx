import clsx from 'clsx';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Image, Modal } from '@components/UI';

import { showModalHandler } from '@store/modal.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

interface IAddToCartModalProps extends IProductData {
  onCloseModalHandler: () => void;
}

export default function AddToCartModal({
  product,
  onCloseModalHandler,
}: Readonly<IAddToCartModalProps>) {
  const navigate = useNavigate();

  const { categories } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  const toCartHandler = () => {
    dispatch(showModalHandler());
    navigate('/cart');
  };

  const toCheckOutHandler = () => {
    dispatch(showModalHandler());
    navigate('/checkout');
  };

  const toShopHandler = () => {
    dispatch(showModalHandler());
    navigate('/shop');
  };

  const modalHandler = () => {
    dispatch(showModalHandler());
  };

  const category = () => {
    return categories?.categories.find(
      (item) => item.id === product?.category_id
    )?.category_name;
  };

  return (
    <Modal
      onCloseModalHandler={modalHandler}
      modalCardClassName={clsx('sm:top-1/4 sm:max-h-fit')}
    >
      <MdClose
        className={clsx(
          'absolute right-6 cursor-pointer text-2xl text-dark-brown',
          'dark:text-white-bone'
        )}
        onClick={onCloseModalHandler}
      />
      <div className='flex flex-col gap-y-6 p-4'>
        <h1
          className={clsx(
            'text-center text-xl font-semibold',
            'dark:text-white-bone'
          )}
        >
          Added Successfully
        </h1>
        <div className='flex flex-row items-center justify-center gap-x-4'>
          <Image
            src={product?.image_url}
            alt={product?.title}
            className='w-32 rounded-sm object-contain ring-1 ring-dark-brown'
          />
          <div
            className={clsx(
              'flex flex-col font-medium',
              'dark:text-white-bone'
            )}
          >
            <span className={clsx('text-lg font-semibold', 'md:text-xl')}>
              {product?.title}
            </span>
            <span className='text-sm'>{category()}</span>
          </div>
        </div>
        <button
          className={clsx(
            'rounded border-2 border-dark-brown py-3 font-semibold text-dark-brown',
            'hover:shadow-md',
            'dark:border-white-bone dark:text-white-bone'
          )}
          onClick={toCartHandler}
        >
          View cart
        </button>
        <button
          className={clsx(
            'rounded bg-dark-brown py-3 font-semibold text-white-bone',
            'hover:shadow-md',
            'dark:bg-white-bone dark:text-dark-brown'
          )}
          onClick={toCheckOutHandler}
        >
          Check out
        </button>
        <button
          className={clsx(
            'text-lg text-dark-brown underline',
            'dark:text-white-bone'
          )}
          onClick={toShopHandler}
        >
          Continue shopping
        </button>
      </div>
    </Modal>
  );
}
