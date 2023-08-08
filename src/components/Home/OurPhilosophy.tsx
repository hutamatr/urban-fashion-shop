import clsx from 'clsx';

import { Image } from '@components/UI';

import philosophyImage from '@assets/image/philosophy-image.webp';

export default function OurPhilosophy() {
  return (
    <section
      className={clsx(
        'grid min-h-fit grid-cols-1 gap-y-4 p-6',
        'md:grid-cols-2 md:gap-6 md:p-10'
      )}
    >
      <div className={clsx('flex flex-col gap-y-4', 'dark:text-white-bone')}>
        <h1 className={clsx('font-noto text-4xl uppercase', 'lg:text-5xl')}>
          Our Philosophy
        </h1>
        <p
          className={clsx(
            'border-b-[1px] border-b-dark-brown font-manrope text-sm font-light uppercase',
            'dark:border-b-white-bone',
            'md:text-lg'
          )}
        >
          You have a more interesting life if you wear impressive clothes.
        </p>
      </div>
      <Image
        src={philosophyImage}
        alt='You have a more interesting life if you wear impressive clothes.'
        className={clsx(
          'ring-1 ring-dark-brown',
          'dark:ring-white-bone',
          'md:object-contain'
        )}
      />
    </section>
  );
}
