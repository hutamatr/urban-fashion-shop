import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, Button, Image } from 'components/UI';

import { MdClose } from 'react-icons/md';

const AddToCartModal = ({ onCloseModalHandler, image, title, category }) => {
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
            src={image}
            alt={title}
            className='h-40 w-32 bg-white object-contain object-center p-4 ring-1 ring-dark-brown'
          />
          <h2 className='font-medium'>
            {title} - {category}
          </h2>
        </div>
        <Button
          className='border-2 border-dark-brown bg-dark-brown py-3 font-semibold uppercase text-white-bone hover:bg-white-bone hover:text-dark-brown'
          onClick={toCartHandler}
        >
          to Cart
        </Button>
      </div>
    </Modal>
  );
};

export default AddToCartModal;
