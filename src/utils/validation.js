const validation = () => {
  const userNameValidation = /^[A-z][A-z0-9-_]{3,23}$/;
  const emailValidation = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const passwordValidation = /^(?=.*[a-z])(?=.*[0-9]).{6,12}$/;

  return {
    userNameValidation,
    emailValidation,
    passwordValidation,
  };
};

export default validation;
