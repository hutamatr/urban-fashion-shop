import clsx from 'clsx';
import { useRef } from 'react';

export default function NewsLetter() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const emailSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailInput = inputRef.current?.value;
    alert(emailInput);
  };

  return (
    <section
      className={clsx(
        'flex flex-col items-center gap-y-2 p-6',
        'dark:border-y-white-bone',
        'md:min-w-[50%] md:p-8'
      )}
    >
      <h2
        className={clsx(
          'font-noto text-2xl font-medium uppercase',
          'dark:text-white-bone',
          'md:text-3xl'
        )}
      >
        NewsLetter
      </h2>
      <p className={clsx('text-sm', 'dark:text-white-bone')}>
        Join our newsletter
      </p>
      <form
        onSubmit={emailSubmitHandler}
        className={clsx(
          'flex max-w-fit items-center border-b border-b-dark-brown',
          'dark:border-white-bone'
        )}
      >
        <input
          type='email'
          ref={inputRef}
          placeholder='Email'
          className={clsx(
            'max-w-sm border-none bg-white-bone p-2 text-sm outline-none ring-0 ',
            'placeholder:uppercase placeholder:text-dark-brown',
            'dark:bg-dark-brown dark:text-white-bone dark:placeholder:text-white-bone'
          )}
        />
        <button
          className={clsx(
            'px-3 py-2 text-sm uppercase duration-300',
            'hover:bg-dark-brown hover:text-white-bone',
            'dark:bg-dark-brown dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown'
          )}
        >
          Submit
        </button>
      </form>
    </section>
  );
}
