import clsx from 'clsx';

interface IRegisterNoteProps {
  placeholder: string;
}

export default function RegisterNote({ placeholder }: IRegisterNoteProps) {
  let note: React.JSX.Element | null = null;
  if (placeholder === 'Username') {
    note = (
      <p className={clsx('text-dark-brown', 'dark:text-white-bone')}>
        * Alphabet, numeric, underscore, hyphens only (4-24).
      </p>
    );
  }

  if (placeholder === 'Password') {
    note = (
      <p className={clsx('text-dark-brown', 'dark:text-white-bone')}>
        * Include uppercase & number (8-24).
      </p>
    );
  }

  return <div className='text-[.65rem] font-semibold'>{note}</div>;
}
