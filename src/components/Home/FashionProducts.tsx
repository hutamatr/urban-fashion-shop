import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { Image } from '@components/UI';

import imageHome from '@assets/image/home-image.webp';

export default function FashionProducts() {
  const navigate = useNavigate();

  const goToShopHandler = () => navigate('/shop', { replace: true });

  return (
    <section
      className={clsx(
        'flex min-h-screen flex-col bg-home-image bg-cover',
        'md:grid md:min-h-fit md:grid-cols-2 md:flex-row md:bg-none',
        'lg:min-h-[50vh]'
      )}
    >
      <Image
        src={imageHome}
        alt='Fashion Products'
        className={clsx('hidden rounded object-contain', 'md:block')}
      />
      <div
        className={clsx(
          'grid min-h-screen grid-cols-1 content-end gap-4 p-6',
          ' md:min-h-fit md:content-between md:p-10'
        )}
      >
        <div className='flex flex-col gap-y-3'>
          <h1
            className={clsx(
              'max-w-fit bg-dark-brown bg-opacity-40 p-1 font-noto text-4xl uppercase text-white-bone',
              'dark:bg-white-bone dark:bg-opacity-40 dark:text-dark-brown',
              'sm:bg-transparent dark:sm:bg-dark-brown dark:sm:text-white-bone',
              'md:text-5xl md:text-dark-brown'
            )}
          >
            Fashion <br /> Products
          </h1>
          <p
            className={clsx(
              'mb-4 bg-dark-brown bg-opacity-40 p-1 text-sm text-white-bone',
              'dark:bg-white-bone dark:bg-opacity-40 dark:text-dark-brown',
              'sm:bg-transparent dark:sm:bg-dark-brown dark:sm:text-white-bone',
              'md:text-lg md:text-dark-brown'
            )}
          >
            Fashion is part of the daily air and it changes all the time, with
            all the events. You can even see the approaching of a revolution in
            clothes. You can see and feel everything in clothes.
          </p>
        </div>
        <button
          className={clsx(
            'rounded border border-dark-brown bg-transparent bg-white-bone py-4 uppercase text-dark-brown',
            'hover:bg-dark-brown hover:text-white-bone',
            'dark:border-white-bone dark:bg-dark-brown dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown ',
            'md:duration-300'
          )}
          onClick={goToShopHandler}
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}
