import React from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from 'components/Navigation/Navigation';
import Footer from 'components/Footer/Footer';
import { ScrollTop } from 'components/UI';

const Layout = () => {
  return (
    <>
      <header className='sticky top-0 z-50 w-full bg-white-bone dark:bg-dark-brown'>
        <Navigation />
      </header>
      <main className='container mx-auto flex min-h-screen max-w-6xl flex-col gap-y-5 dark:bg-dark-brown'>
        <Outlet />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Layout;
