import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import { z } from 'zod';

import { Loading } from '@components/UI';
import Input from '@components/UI/Input';

import { useAppDispatch, useAppSelector } from '@store/store';
import { fetchUser, updateUserDetail } from '@store/user.slice';

import { userDetailSchema } from '@utils/formSchema';

import 'react-phone-number-input/style.css';

type FormSchemaType = z.infer<typeof userDetailSchema>;

export default function AccountDetails() {
  const dispatch = useAppDispatch();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(userDetailSchema),
  });

  const { status, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      setValue('firstName', user.first_name);
      setValue('lastName', user.last_name);
      setValue('email', user.email);
      setValue('address', user.address);
      setPhoneNumber(user.phone_number);
    }
  }, [setValue, user]);

  const updateUserHandler: SubmitHandler<FormSchemaType> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    if (
      user?.first_name === data.firstName &&
      user?.last_name === data.lastName &&
      user?.address === data.address &&
      user.phone_number === phoneNumber
    ) {
      toast.error('No changes detected!', {
        duration: 2000,
      });
      return;
    }

    const updatedUser: IUserUpdate = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: phoneNumber,
      address: data.address,
    };

    const res = await dispatch(updateUserDetail(updatedUser));

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Update user successfully!', { duration: 1500 });
    }

    if (res.meta.requestStatus === 'rejected') {
      toast.error('Update user detail failed!', {
        duration: 1500,
      });
    }
  };

  return (
    <section className={clsx('', 'md:px-6')}>
      <div
        className={clsx(
          'mb-4 flex flex-col gap-y-2',
          'md:flex-row md:items-center md:gap-x-8'
        )}
      >
        <h2 className={clsx('text-2xl font-semibold', 'dark:text-white-bone')}>
          Your Profile
        </h2>
        {status === 'rejected' && (
          <p className='text-sm text-red-700'>Failed to view user data!</p>
        )}
      </div>
      {status === 'pending' ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(updateUserHandler)}
          className={clsx('flex flex-col gap-y-4', 'md:gap-y-5')}
        >
          <div className={clsx('grid grid-cols-1 gap-4', 'md:grid-cols-3')}>
            <Input
              title='First Name'
              type='text'
              {...register('firstName', { required: true })}
              aria-invalid={errors.firstName ? 'true' : 'false'}
              errors={
                errors.firstName && (
                  <span className='block text-xs text-red-800'>
                    {errors.firstName?.message}
                  </span>
                )
              }
            />
            <Input
              title='Last Name'
              type='text'
              {...register('lastName', { required: true })}
              aria-invalid={errors.lastName ? 'true' : 'false'}
              errors={
                errors.lastName && (
                  <span className='block text-xs text-red-800'>
                    {errors.lastName?.message}
                  </span>
                )
              }
            />
            <Input
              title='Email'
              type='email'
              disabled
              readOnly
              {...register('email', { required: true })}
              aria-invalid={errors.email ? 'true' : 'false'}
              errors={
                errors.email && (
                  <span className='block text-xs text-red-800'>
                    {errors.email?.message}
                  </span>
                )
              }
            />
            <div className='flex flex-col gap-y-1'>
              <label
                htmlFor='phone'
                className={clsx(
                  'text-xs font-medium text-dark-brown',
                  'dark:text-white-bone'
                )}
              >
                Phone Number
              </label>
              <PhoneInput
                placeholder='Enter phone number'
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value as string)}
                defaultCountry='ID'
                className={clsx(
                  'w-full rounded bg-white-bone font-medium',
                  'dark:bg-dark-brown dark:placeholder:text-white-bone',
                  'placeholder:text-sm focus:ring-0'
                )}
              />
            </div>
          </div>
          <Input
            title='Address'
            isTextArea={true}
            {...register('address', { required: true })}
            aria-invalid={errors.address ? 'true' : 'false'}
            errors={
              errors.address && (
                <span className='block text-xs text-red-800'>
                  {errors.address?.message}
                </span>
              )
            }
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
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
