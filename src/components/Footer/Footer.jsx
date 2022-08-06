import React from "react";

import NewsLetter from "./NewsLetter";
import NavigationFooter from "./NavigationFooter";
import SocialsMedia from "./SocialsMedia";

const Footer = () => {
  return (
    <footer>
      <div className="md:flex md:border-b md:border-b-dark-brown">
        <NewsLetter />
        <NavigationFooter />
      </div>
      <SocialsMedia />
    </footer>
  );
};

export default Footer;
