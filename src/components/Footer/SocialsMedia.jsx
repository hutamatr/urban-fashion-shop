import React from 'react';

import { BsInstagram, BsFacebook } from 'react-icons/bs';

const SocialsMedia = () => {
  return (
    <section className='text-xs uppercase md:grid md:grid-flow-col'>
      <ul className='flex items-center justify-center gap-x-4 py-4 px-6 sm:justify-around sm:gap-x-2'>
        <li>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-x-2 dark:text-white-bone'
          >
            <BsInstagram />
            Instagram
          </a>
        </li>
        <li>
          <a
            href='https://www.facebook.com/'
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-x-2 dark:text-white-bone'
          >
            <BsFacebook />
            Facebook
          </a>
        </li>
      </ul>
      <div className='flex items-center justify-center py-4 px-6 dark:text-white-bone'>
        <a href='mailto:urbanFashion@gmail.com'>urbanFashion@gmail.com</a>
      </div>
      <div className='flex flex-col items-center justify-center gap-y-6 gap-x-4 py-4 px-6 dark:text-white-bone md:flex-row md:justify-around md:gap-x-2'>
        <span>Privacy Policy</span>
        <span>Term & Conditions</span>
      </div>
      <div className='py-4 px-6 text-center dark:text-white-bone'>
        <span>urban fashion &#169; {new Date().getFullYear()}</span>
      </div>
    </section>
  );
};

export default SocialsMedia;
