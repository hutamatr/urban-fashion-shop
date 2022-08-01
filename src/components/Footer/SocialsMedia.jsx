import React from "react";

import { BsInstagram, BsFacebook } from "react-icons/bs";

const SocialsMedia = () => {
  return (
    <section className="grid grid-flow-row text-xs uppercase">
      <ul className="flex items-center justify-around border-b border-b-dark-brown py-4 px-6">
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
      <div className="flex justify-around border-b border-b-dark-brown py-4 px-6">
        <span>Contact Us</span>
        <a href="mailto:!unknown@gmail.com">!unknown@gmail.com</a>
      </div>
      <div className="flex justify-around border-b border-b-dark-brown py-4 px-6">
        <span>Privacy Policy</span>
        <span>Term & Conditions</span>
      </div>
      <div className="border-b border-b-dark-brown py-4 px-6 text-center">
        <span>!unknown &#169; 2022</span>
      </div>
    </section>
  );
};

export default SocialsMedia;
