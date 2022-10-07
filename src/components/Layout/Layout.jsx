import React from "react";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import ScrollTop from "../UI/ScrollTop";

const Layout = ({ children }) => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white-bone">
        <Navigation />
      </header>
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-y-5">
        {children}
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Layout;
