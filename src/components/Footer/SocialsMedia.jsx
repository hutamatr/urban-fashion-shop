import React from "react";

import { BsInstagram, BsFacebook } from "react-icons/bs";

const SocialsMedia = () => {
  return (
    <section className="text-xs uppercase lg:grid lg:grid-flow-col">
      <ul className="flex items-center justify-center gap-x-4 py-4 px-6 sm:justify-around sm:gap-x-0">
        <li>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-x-2"
          >
            <BsInstagram />
            Instagram
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-x-2"
          >
            <BsFacebook />
            Facebook
          </a>
        </li>
      </ul>
      <div className="flex items-center justify-center py-4 px-6">
        <a href="mailto:!unknown@gmail.com">!unknown@gmail.com</a>
      </div>
      <div className="flex items-center justify-center gap-x-4 py-4 px-6 sm:justify-around sm:gap-x-0">
        <span>Privacy Policy</span>
        <span>Term & Conditions</span>
      </div>
      <div className="py-4 px-6 text-center">
        <span>!unknown &#169; 2022</span>
      </div>
    </section>
  );
};

export default SocialsMedia;
