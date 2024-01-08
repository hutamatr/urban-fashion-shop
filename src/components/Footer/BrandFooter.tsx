import clsx from 'clsx';

import { Image } from '@components/UI';

import LogoImg from '@assets/image/logo/logo-no-background.svg';

export default function BrandFooter() {
  return (
    <section className='flex min-w-[40%] flex-col items-start gap-y-3 py-6'>
      <Image
        src={LogoImg}
        alt='Urban Fashion'
        className={clsx('w-64', 'md:mx-0 md:w-72')}
      />
      <p
        className={clsx(
          'w-56 text-left text-lg text-dark-brown/80',
          'dark:text-white-bone/80'
        )}
      >
        You have a more input life if you wear impressive clothes.
      </p>
    </section>
  );
}
