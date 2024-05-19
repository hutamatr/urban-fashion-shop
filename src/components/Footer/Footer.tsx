import clsx from 'clsx';

import BrandFooter from './BrandFooter';
import NavigationFooter from './NavigationFooter';
import SocialsMedia from './SocialsMedia';

export default function Footer() {
  return (
    <footer
      className={clsx(
        'border-t border-t-dark-brown bg-pastel-brown',
        'dark:border-t-white-bone dark:bg-pastel-dark-brown'
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
