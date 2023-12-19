import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Input from '@components/UI/Input';

import { registerUser } from '@store/authSlice';
import { useAppDispatch } from '@store/store';

import { signUpSchema } from '@utils/formSchema';

import { IError } from 'types/types';

type FormSchemaType = z.infer<typeof signUpSchema>;

export default function Register() {
  const [isPassView, setIsPassView] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const viewPasswordHandler = () => {
    setIsPassView((prevState) => !prevState);
  };
  const RegisterSubmitHandler: SubmitHandler<FormSchemaType> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    const registerFormInput = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    const res = await dispatch(registerUser(registerFormInput));

    if (res.meta.requestStatus === 'fulfilled') {
      reset();
      navigate('/', { replace: true });
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
            Sign Up
          </h1>
          <form
            onSubmit={handleSubmit(RegisterSubmitHandler)}
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

            <Input
              title='Confirm Password'
              isPassView={isPassView}
              type={isPassView ? 'text' : 'password'}
              placeholder='••••••••'
              {...register('confirmPassword', {
                required: true,
              })}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              errors={
                errors.confirmPassword && (
                  <span className='block text-xs text-red-800'>
                    {errors.confirmPassword?.message}
                  </span>
                )
              }
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className={clsx(
                'bg-dark-brown py-3 text-xs font-light text-white',
                'disabled:cursor-not-allowed disabled:bg-dark-brown/50',
                'dark:bg-white-bone dark:font-medium dark:text-dark-brown'
              )}
            >
              {isSubmitting ? 'Loading...' : 'Sign Up'}
            </button>
          </form>
          <p className={clsx('text-center text-sm', 'dark:text-white-bone')}>
            Already have an account?{' '}
            <Link
              to='/signin'
              className={clsx(
                'font-semibold text-dark-brown underline',
                'dark:text-white-bone'
              )}
            >
              Log In
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
