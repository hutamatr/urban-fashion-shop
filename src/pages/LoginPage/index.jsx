import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Tooltip } from 'flowbite-react';
import { shallow } from 'zustand/shallow';

import validation from 'utils/validation';
// import useAxios from 'hooks/useAxios';
import useFormState from 'hooks/useFormState';
import { Button, LoginRegisterInput } from 'components/UI';
import { useStore } from 'store/useStore';
import toast, { Toaster } from 'react-hot-toast';

const account = `For demo purposes, use this demo account. username : johnd, password : m38rmF$`;

const Login = () => {
  const { input, setInput, onChangeInputHandler } = useFormState({
    username: '',
    password: '',
  });

  const usernameRef = useRef();
  const { authHandler, isLoading, isError, error } = useStore(
    (state) => ({
      authHandler: state.authHandler,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  // const { requestHttp, error, loading } = useAxios();
  const { userNameValidation, passwordValidation } = validation();

  if (isError) {
    toast.error(error.message);
  }

  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const { username, password } = input;

  useEffect(() => {
    const usernameValid = userNameValidation.test(username);
    const passwordValid = passwordValidation.test(password);
    setIsValidUserName(usernameValid);
    setIsValidPassword(passwordValid);
  }, [username, password, userNameValidation, passwordValidation]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    usernameRef.current.focus();
  }, []);

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const loginInput = {
      username,
      password,
    };

    authHandler(loginInput);
    setTimeout(() => {
      toast.success('Login Successfully');
    }, 1000);

    // requestHttp(
    //   {
    //     method: 'POST',
    //     url: 'auth/login',
    //     dataReq: loginInput,
    //   },
    //   (data) => {
    //     const expireDateLogin = new Date(new Date().getTime() + 86400 * 1000);
    //     authHandler(data?.token, expireDateLogin.toISOString());
    //     setTimeout(() => {
    //       toast.success('Login Successfully');
    //     }, 1000);
    //   }
    // );

    setInput({
      username: '',
      password: '',
    });
  };

  return (
    <>
      <Toaster />
      <section className='m-auto flex w-full flex-col gap-y-4 p-6 md:max-w-xs'>
        <div className='flex items-center justify-between'>
          <h1 className='text-sm font-bold dark:text-white-bone'>Log In</h1>
          <Tooltip content={account} trigger='click'>
            <Button
              className='p-1 text-xs font-semibold ring-2 ring-dark-brown dark:text-white-bone dark:ring-white-bone'
              type='button'
            >
              Demo Account
            </Button>
          </Tooltip>
        </div>
        <form onSubmit={loginSubmitHandler} className='flex flex-col gap-y-2'>
          <LoginRegisterInput
            placeholder='Username'
            name='username'
            input={username}
            type='text'
            ref={usernameRef}
            onChange={onChangeInputHandler}
            isValidInput={isValidUserName}
          />

          <LoginRegisterInput
            placeholder='Password'
            name='password'
            input={password}
            type='password'
            onChange={onChangeInputHandler}
            isValidInput={isValidPassword}
          />

          <Button
            className='flex flex-row items-center justify-center gap-x-2 bg-dark-brown py-3 font-light text-white disabled:cursor-not-allowed dark:bg-white-bone dark:font-semibold dark:text-dark-brown'
            disabled={!isValidUserName || !isValidPassword ? true : false}
            type='submit'
          >
            {isLoading && <Spinner />}

            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
        <p className='text-center text-sm dark:text-white-bone'>
          Don&apos;t have an account?{' '}
          <Link
            to='/register'
            className='font-semibold text-dark-brown underline dark:text-white-bone'
          >
            Sign Up
          </Link>
        </p>
      </section>
    </>
  );
};

export default Login;
