import clsx from 'clsx';
import { BsFacebook, BsInstagram } from 'react-icons/bs';

export default function SocialsMedia() {
  return (
    <section
      className={clsx(
        'mt-4 flex flex-col items-start gap-y-4 text-left text-xs uppercase',
        'md:mt-0 md:grid md:grid-flow-col'
      )}
    >
      <ul
        className={clsx(
          'flex items-center justify-center gap-x-4',
          'sm:justify-around sm:gap-x-2',
          'md:px-6 md:py-4'
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
          'flex items-center justify-center',
          'dark:text-white-bone',
          'md:px-6 md:py-4'
        )}
      >
        <a href='mailto:urbanFashion@gmail.com'>urbanFashion@gmail.com</a>
      </div>
      <div
        className={clsx(
          'flex flex-col items-start justify-center gap-x-4 gap-y-4 text-left',
          'dark:text-white-bone',
          'md:flex-row md:justify-around md:gap-x-2 md:px-6 md:py-4'
        )}
      >
        <span>Privacy Policy</span>
        <span>Term & Conditions</span>
      </div>
      <div
        className={clsx(
          'flex w-full items-center justify-center py-4 text-center',
          'dark:text-white-bone',
          'md:block md:px-6'
        )}
      >
        <span>urban fashion &#169; {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}
