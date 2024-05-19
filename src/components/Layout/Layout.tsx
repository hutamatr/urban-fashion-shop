import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import Footer from '@components/Footer/Footer';
import Navigation from '@components/Navigation/Navigation';
import { ScrollTop } from '@components/UI';

export default function Layout() {
  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-[999] w-full bg-white-bone',
          'dark:bg-dark-brown'
        )}
      >
        <Navigation />
      </header>
      <main className={clsx('flex flex-col', 'dark:bg-dark-brown')}>
        <Outlet />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
