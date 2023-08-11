import clsx from 'clsx';

import BrandFooter from './BrandFooter';
import NavigationFooter from './NavigationFooter';
// import NewsLetter from './NewsLetter';
import SocialsMedia from './SocialsMedia';

export default function Footer() {
  return (
    <footer
      className={clsx(
        'border-y border-y-dark-brown',
        'dark:border-y-white-bone'
      )}
    >
      <div className='layout'>
        <div className={clsx('md:flex')}>
          <BrandFooter />
          <NavigationFooter />
        </div>
        <SocialsMedia />
      </div>
    </footer>
  );
}
