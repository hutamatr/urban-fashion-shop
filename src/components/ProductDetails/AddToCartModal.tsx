import clsx from 'clsx';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Image, Modal } from '@components/UI';

import { IProductData } from 'types/types';

interface IAddToCartModalProps extends IProductData {
  onCloseModalHandler: () => void;
}

export default function AddToCartModal({
  data,
  onCloseModalHandler,
}: IAddToCartModalProps) {
  const navigate = useNavigate();

  const toCartHandler = () => navigate('/cart');

  return (
    <Modal onCloseModalHandler={onCloseModalHandler}>
      <MdClose
        className='absolute right-6 cursor-pointer text-2xl'
        onClick={onCloseModalHandler}
      />
      <div className='flex flex-col gap-y-6 p-4'>
        <h1 className='text-center text-xl font-semibold'>
          Added Successfully
        </h1>
        <div className='flex flex-row items-center justify-center gap-x-4'>
          <Image
            src={`${import.meta.env.VITE_IMAGE_URL}${data?.attributes.images
              .data[0].attributes.url}`}
            alt={data?.attributes.name}
            className='w-32 rounded-sm object-contain ring-1 ring-dark-brown'
          />
          <div className='flex flex-col font-medium'>
            <span className={clsx('text-lg font-semibold', 'md:text-xl')}>
              {data?.attributes.name}
            </span>
            <span className='text-sm'>
              {data?.attributes.category.data.attributes.name}
            </span>
          </div>
        </div>
        <button
          className={clsx(
            'border-2 border-dark-brown bg-dark-brown py-3 font-semibold uppercase text-white-bone',
            'hover:bg-white-bone hover:text-dark-brown'
          )}
          onClick={toCartHandler}
        >
          to Cart
        </button>
      </div>
    </Modal>
  );
}
