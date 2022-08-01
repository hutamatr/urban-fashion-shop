import React from "react";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import ScrollTop from "../UI/ScrollTop";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Layout;
