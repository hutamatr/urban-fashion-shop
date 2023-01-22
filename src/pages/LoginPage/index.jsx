import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner, Tooltip } from 'flowbite-react';

import validation from 'utils/validation';
import useAxios from 'hooks/useAxios';
import useFormState from 'hooks/useFormState';
import { Toast, Button, LoginRegisterInput } from 'components/UI';
import { useAuth } from 'hooks/useStoreContext';

const account = `For demo purposes, use this demo account. username : johnd, password : m38rmF$`;

const Login = () => {
  const { input, setInput, onChangeInputHandler } = useFormState({
    username: '',
    password: '',
  });

  const usernameRef = useRef();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { requestHttp, error, setError, loading } = useAxios();
  const { userNameValidation, passwordValidation } = validation();

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

    requestHttp(
      {
        method: 'POST',
        url: 'auth/login',
        dataReq: loginInput,
      },
      (data) => {
        const expireDateLogin = new Date(new Date().getTime() + 86400 * 1000);
        auth(data?.token, 'Login Successfully', expireDateLogin.toISOString());
        navigate('/', { replace: true });
      }
    );

    setInput({
      username: '',
      password: '',
    });
  };

  return (
    <>
      {error.isError && (
        <Toast onError={error.isError} onSetError={setError} icons='error'>
          {error.errorMessage}
        </Toast>
      )}
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
            {loading.isLoading && <Spinner />}

            {loading.isLoading ? loading.loadingMessage : 'Login'}
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
