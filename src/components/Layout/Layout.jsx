import React from "react";

import Navigation from "../Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
