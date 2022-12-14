import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import ScrollTop from "../UI/ScrollTop";

const Layout = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white-bone dark:bg-dark-brown">
        <Navigation />
      </header>
      <main className="container mx-auto flex min-h-screen max-w-6xl flex-col gap-y-5 dark:bg-dark-brown">
        <Outlet />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Layout;
