import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { z } from 'zod';

import { Modal } from '@components/UI';
import Input from '@components/UI/Input';

import { forgotPasswordLink } from '@store/authSlice';
import { showModalHandler } from '@store/modalSlice';
import { useAppDispatch } from '@store/store';

import { forgotPasswordSchema } from '@utils/formSchema';

type FormSchemaType = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const dispatch = useAppDispatch();

  const modalHandler = () => {
    dispatch(showModalHandler());
  };

  const sendEmailForgotPasswordHandler: SubmitHandler<FormSchemaType> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    const emailUser: IForgotPassword = {
      email: data.email,
    };

    const res = await dispatch(forgotPasswordLink(emailUser));

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success(res.payload?.message as string, { duration: 3000 });
      modalHandler();
      reset();
    }

    if (res.meta.requestStatus === 'rejected') {
      toast.error('Something went wrong, try again later', { duration: 3000 });
    }
  };

  return (
    <Modal
      onCloseModalHandler={modalHandler}
      modalCardClassName={clsx('flex flex-col gap-y-3 lg:top-0 lg:max-w-2xl')}
    >
      <MdClose
        className={clsx(
          'absolute right-3 top-3 cursor-pointer text-2xl text-dark-brown',
          'dark:text-white-bone'
        )}
        onClick={modalHandler}
      />
      <div className='flex flex-col gap-y-2'>
        <h1
          className={clsx(
            'text-center text-lg font-semibold',
            'dark:text-white-bone'
          )}
        >
          Forgot Password
        </h1>
        <p className={clsx('text-sm', 'dark:text-white-bone')}>
          please input your email, we will send you a password reset link
        </p>
      </div>
      <form
        onSubmit={handleSubmit(sendEmailForgotPasswordHandler)}
        className={clsx('flex flex-col gap-y-4', 'md:gap-y-5')}
      >
        <Input
          title='Email'
          type='email'
          {...register('email', { required: true })}
        />
        <div className='flex flex-col gap-y-2'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={clsx(
              'flex flex-row items-center justify-center gap-x-2 rounded-sm bg-dark-brown py-3 font-light text-white',
              'disabled:cursor-not-allowed',
              'dark:bg-white-bone dark:font-semibold dark:text-dark-brown'
            )}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
