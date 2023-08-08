import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { MdArrowUpward } from 'react-icons/md';

export function ScrollTop() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTopHandler = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={clsx(
        scrollPosition > 500 ? 'block' : 'translate-y-96',
        'fixed bottom-0 right-0 z-30 m-6 rounded-full bg-dark-brown p-3 opacity-80 ring-2 ring-dark-brown duration-700',
        'hover:-translate-y-2 hover:opacity-100',
        'dark:bg-white-bone'
      )}
      onClick={scrollTopHandler}
    >
      <MdArrowUpward
        className={clsx('text-xl text-white-bone', 'dark:text-dark-brown')}
      />
    </button>
  );
}
