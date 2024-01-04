import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import ForgotPassword from '@components/ResetPassword/ForgotPassword';
import Input from '@components/UI/Input';

import { loginUser } from '@store/authSlice';
import { showModalHandler } from '@store/modalSlice';
import { useAppDispatch, useAppSelector } from '@store/store';

import { signInSchema } from '@utils/formSchema';

type FormSchemaType = z.infer<typeof signInSchema>;

export default function Login() {
  const [isPassView, setIsPassView] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const { isModalShow } = useAppSelector((state) => state.modal);
  const navigate = useNavigate();

  const viewPasswordHandler = () => {
    setIsPassView((prevState) => !prevState);
  };

  const showForgotPasswordHandler = () => {
    dispatch(showModalHandler());
  };

  const loginSubmitHandler: SubmitHandler<FormSchemaType> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    const loginInput = {
      email: data.email,
      password: data.password,
    };

    const res = await dispatch(loginUser(loginInput));

    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/', { replace: true });
      toast.success(res.payload?.message as string, { duration: 3000 });
      reset();
    }

    if (res.meta.requestStatus === 'rejected') {
      const payload = res.payload as IError;
      payload.message.forEach((message: string) => {
        toast.error(message, { duration: 3000 });
      });
    }
  };

  return (
    <>
      <Toaster position='top-center' />
      <section className='grid min-h-[90vh] place-items-center'>
        <div className={clsx('flex w-full flex-col gap-y-4', 'md:max-w-xs')}>
          <h1
            className={clsx(
              'text-center font-bold',
              'dark:text-white-bone',
              'md:text-lg'
            )}
          >
            Sign In
          </h1>
          <form
            onSubmit={handleSubmit(loginSubmitHandler)}
            className={clsx('flex flex-col gap-y-4', 'md:gap-y-5')}
          >
            <Input
              title='Your Email'
              type='email'
              placeholder='name@example.com'
              {...register('email', {
                required: true,
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
              errors={
                errors.email && (
                  <span className='block text-xs text-red-800'>
                    {errors.email?.message}
                  </span>
                )
              }
            />

            <Input
              title='Password'
              isPassword
              isPassView={isPassView}
              onViewPasswordHandler={viewPasswordHandler}
              type={isPassView ? 'text' : 'password'}
              placeholder='••••••••'
              {...register('password', {
                required: true,
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
              errors={
                errors.password && (
                  <span className='block text-xs text-red-800'>
                    {errors.password?.message}
                  </span>
                )
              }
            />
            <button
              className={clsx(
                'flex flex-row items-center justify-center gap-x-2 bg-dark-brown py-3 font-light text-white',
                'disabled:cursor-not-allowed',
                'dark:bg-white-bone dark:font-semibold dark:text-dark-brown'
              )}
              disabled={isSubmitting || status === 'pending'}
              type='submit'
            >
              {isSubmitting ? 'loading...' : 'Sign In'}
            </button>
          </form>
          <p className={clsx('text-center text-sm', 'dark:text-white-bone')}>
            Don&apos;t have an account?{' '}
            <Link
              to='/signup'
              className={clsx(
                'font-semibold text-dark-brown underline',
                'dark:text-white-bone'
              )}
            >
              Sign Up
            </Link>
          </p>
          <button
            className={clsx('text-center text-sm text-red-500 underline')}
            onClick={showForgotPasswordHandler}
          >
            Forgot your password?
          </button>
        </div>
      </section>
      {isModalShow && <ForgotPassword />}
    </>
  );
}
