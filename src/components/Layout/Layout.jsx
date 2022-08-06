import React from "react";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import ScrollTop from "../UI/ScrollTop";

const Layout = ({ children }) => {
  return (
    <div className="mx-auto max-w-6xl border-x border-x-dark-brown">
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Layout;
