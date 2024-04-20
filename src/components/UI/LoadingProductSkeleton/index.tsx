import clsx from 'clsx';

interface ILoadingProductSkeletonProps {
  length: number;
}

export function LoadingProductSkeleton({
  length,
}: Readonly<ILoadingProductSkeletonProps>) {
  return (
    <>
      {Array.from({ length })?.map((_, index) => {
        return (
          <li key={Date.now().toString() + index.toString()} className='mb-4'>
            <div
              className={clsx(
                'grid min-h-full animate-pulse grid-cols-1 gap-4 rounded bg-dark-brown/40 p-4',
                'dark:bg-white-bone/40'
              )}
            >
              <div
                className={clsx(
                  'h-64 w-full animate-pulse rounded bg-white-bone/60',
                  'dark:bg-dark-brown/60'
                )}
              ></div>
              <div
                className={clsx(
                  'h-6 w-full animate-pulse rounded bg-white-bone/60',
                  'dark:bg-dark-brown/60'
                )}
              ></div>
              <div
                className={clsx(
                  'h-6 w-24 animate-pulse rounded bg-white-bone/60',
                  'dark:bg-dark-brown/60'
                )}
              ></div>
            </div>
          </li>
        );
      })}
    </>
  );
}
