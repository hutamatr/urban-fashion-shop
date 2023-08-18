import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import Input from '@components/UI/Input';

import { changePassword, logoutUser } from '@store/authSlice';
import { useAppDispatch } from '@store/store';

import { changePasswordSchema } from '@utils/formSchema';

import { IChangePassword } from 'types/types';

type FormSchemaType = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const [isPassView, setIsPassView] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const dispatch = useAppDispatch();

  const viewPasswordHandler = () => {
    setIsPassView((prevState) => !prevState);
  };

  const updatePasswordHandler: SubmitHandler<FormSchemaType> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    const changedPassword: IChangePassword = {
      currentPassword: data.currentPassword,
      password: data.newPassword,
      passwordConfirmation: data.confirmNewPassword,
    };

    const res = await dispatch(changePassword(changedPassword));

    if (res.meta.requestStatus === 'fulfilled') {
      dispatch(logoutUser())
        .unwrap()
        .then(() => {
          setTimeout(() => {
            toast.success('Change password successfully!', {
              duration: 3000,
            });
          }, 1000);
        });
    }

    if (res.meta.requestStatus === 'rejected') {
      toast.error('Change password failed!', {
        duration: 3000,
      });
    }

    reset();
  };

  return (
    <section className={clsx('flex flex-col gap-y-4', 'md:px-6')}>
      <h2 className={clsx('text-2xl font-semibold', 'dark:text-white-bone')}>
        Change Password*
      </h2>
      <form
        onSubmit={handleSubmit(updatePasswordHandler)}
        className={clsx(
          'flex w-full flex-col gap-y-4',
          'md:max-w-xl md:gap-y-5'
        )}
      >
        <Input
          title='Current Password'
          type={isPassView ? 'text' : 'password'}
          isPassword
          isPassView={isPassView}
          onViewPasswordHandler={viewPasswordHandler}
          {...register('currentPassword', { required: true })}
        />
        <Input
          title='New Password'
          type={isPassView ? 'text' : 'password'}
          {...register('newPassword', { required: true })}
        />
        <Input
          title='Confirm New Password'
          type={isPassView ? 'text' : 'password'}
          {...register('confirmNewPassword', { required: true })}
        />
        <div className='flex flex-col gap-y-2'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={clsx(
              'mx-auto block w-fit flex-row gap-x-2 rounded-sm bg-dark-brown px-4 py-3 font-light text-white',
              'disabled:cursor-not-allowed disabled:bg-dark-brown/80',
              'dark:bg-white-bone dark:font-semibold dark:text-dark-brown dark:disabled:bg-white-bone/80'
            )}
          >
            {isSubmitting ? 'Updating...' : 'Change Password'}
          </button>
        </div>
      </form>
      <span className={clsx('text-xs text-dark-brown', 'dark:text-white-bone')}>
        * you will be logged in again after changing your password
      </span>
    </section>
  );
}
