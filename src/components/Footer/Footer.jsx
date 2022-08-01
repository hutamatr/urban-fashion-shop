import React from "react";

import NewsLetter from "./NewsLetter";
import NavigationFooter from "./NavigationFooter";
import SocialsMedia from "./SocialsMedia";

const Footer = () => {
  return (
    <footer>
      <NewsLetter />
      <NavigationFooter />
      <SocialsMedia />
    </footer>
  );
};

export default Footer;
