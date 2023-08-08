import clsx from 'clsx';
import { BsFacebook, BsInstagram } from 'react-icons/bs';

export default function SocialsMedia() {
  return (
    <section className={clsx('text-xs uppercase', 'md:grid md:grid-flow-col')}>
      <ul
        className={clsx(
          'flex items-center justify-center gap-x-4 px-6 py-4',
          'sm:justify-around sm:gap-x-2'
        )}
      >
        <li>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            rel='noreferrer'
            className={clsx(
              'flex items-center gap-x-2',
              'dark:text-white-bone'
            )}
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
            className={clsx(
              'flex items-center gap-x-2',
              'dark:text-white-bone'
            )}
          >
            <BsFacebook />
            Facebook
          </a>
        </li>
      </ul>
      <div
        className={clsx(
          'flex items-center justify-center px-6 py-4',
          'dark:text-white-bone'
        )}
      >
        <a href='mailto:urbanFashion@gmail.com'>urbanFashion@gmail.com</a>
      </div>
      <div
        className={clsx(
          'flex flex-col items-center justify-center gap-x-4 gap-y-6 px-6 py-4',
          'dark:text-white-bone',
          'md:flex-row md:justify-around md:gap-x-2'
        )}
      >
        <span>Privacy Policy</span>
        <span>Term & Conditions</span>
      </div>
      <div className={clsx('px-6 py-4 text-center', 'dark:text-white-bone')}>
        <span>urban fashion &#169; {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}
