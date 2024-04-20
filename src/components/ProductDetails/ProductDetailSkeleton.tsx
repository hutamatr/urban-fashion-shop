import clsx from 'clsx';

const ProductDetailSkeleton = () => {
  return (
    <section
      className={clsx(
        'grid grid-cols-1 border-b border-b-dark-brown',
        'dark:border-b-white-bone',
        'md:mt-14 md:grid-cols-2'
      )}
    >
      <div
        className={clsx(
          'h-64 w-full animate-pulse rounded bg-dark-brown/75',
          'dark:bg-white-bone/70',
          'md:h-[20rem]'
        )}
      ></div>
      <div className={clsx('flex flex-col gap-y-6 py-5', 'md:p-5')}>
        <div
          className={clsx(
            'h-12 w-80 animate-pulse rounded bg-dark-brown/75',
            'dark:bg-white-bone/75'
          )}
        ></div>
        <div
          className={clsx(
            'h-8 w-44 animate-pulse rounded bg-dark-brown/75',
            'dark:bg-white-bone/75'
          )}
        ></div>
        <div
          className={clsx(
            'flex flex-col-reverse gap-y-4',
            'md:w-full md:flex-row md:items-center md:justify-between'
          )}
        >
          <div
            className={clsx(
              'h-12 w-44 animate-pulse rounded bg-dark-brown/75',
              'dark:bg-white-bone/75'
            )}
          ></div>

          <div
            className={clsx(
              'h-12 w-40 animate-pulse rounded bg-dark-brown/75',
              'dark:bg-white-bone/75'
            )}
          ></div>
        </div>
        <div
          className={clsx(
            'h-6 w-72 animate-pulse rounded bg-dark-brown/75',
            'dark:bg-white-bone/75'
          )}
        ></div>
        <div
          className={clsx(
            'h-12 w-full animate-pulse rounded bg-dark-brown/75',
            'dark:bg-white-bone/75'
          )}
        ></div>
      </div>
    </section>
  );
};

export default ProductDetailSkeleton;
