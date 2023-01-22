const RegisterNote = ({ placeholder }) => {
  let note;

  if (placeholder === 'Username') {
    note = (
      <p className='text-dark-brown dark:text-white-bone'>
        * Alphabet, numeric, underscore, hyphens only (4-24).
      </p>
    );
  }

  if (placeholder === 'Password') {
    note = (
      <p className='text-dark-brown dark:text-white-bone'>
        * Include uppercase & number (8-24).
      </p>
    );
  }

  return <div className='text-[.65rem] font-semibold'>{note}</div>;
};

export default RegisterNote;
