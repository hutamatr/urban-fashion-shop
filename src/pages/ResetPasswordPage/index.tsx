import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import Input from '@components/UI/Input';

import { resetPassword } from '@store/authSlice';
import { useAppDispatch } from '@store/store';

import { resetPasswordSchema } from '@utils/formSchema';

type FormSchemaType = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const [isPassView, setIsPassView] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();

  const viewPasswordHandler = () => {
    setIsPassView((prevState) => !prevState);
  };

  const resetPasswordHandler: SubmitHandler<FormSchemaType> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    if (data.password.length < 7 || data.confirmPassword.length < 7) {
      toast.error('Password must have at least 8 characters', {
        duration: 3000,
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!', {
        duration: 3000,
      });
      return;
    }

    const resetPasswordInput: IResetPassword = {
      new_password: data.password,
      token: token as string,
      userId: Number(id as string),
    };

    const res = await dispatch(resetPassword(resetPasswordInput));

    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/signin', { replace: true });
      setTimeout(() => {
        toast.success(res.payload?.message as string, { duration: 3000 });
      }, 1000);
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
      <Toaster position='top-center' reverseOrder={false} />
      <section className='mx-6 grid min-h-[90vh] place-items-center'>
        <div className={clsx('flex w-full flex-col gap-y-4', 'md:max-w-xs')}>
          <h1
            className={clsx(
              'text-center font-bold',
              'dark:text-white-bone',
              'md:text-lg'
            )}
          >
            Reset Password
          </h1>
          <form
            onSubmit={handleSubmit(resetPasswordHandler)}
            className={clsx('flex flex-col gap-y-4', 'md:gap-y-5')}
          >
            <Input
              title='New Password'
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
                errors?.password && (
                  <span className='block text-xs text-red-800'>
                    {errors.password?.message}
                  </span>
                )
              }
            />

            <Input
              title='Confirm New Password'
              type={isPassView ? 'text' : 'password'}
              placeholder='••••••••'
              {...register('confirmPassword', {
                required: true,
              })}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              errors={
                errors?.confirmPassword && (
                  <span className='block text-xs text-red-800'>
                    {errors.confirmPassword?.message}
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
              disabled={isSubmitting}
              type='submit'
            >
              {isSubmitting ? 'loading...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordPage;
