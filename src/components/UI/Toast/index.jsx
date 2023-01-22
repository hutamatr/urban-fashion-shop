import React, { useEffect } from 'react';
import { Toast as ToastAlert } from 'flowbite-react';
import { MdCheckCircleOutline, MdErrorOutline } from 'react-icons/md';

export const Toast = ({
  children,
  icons,
  onSuccess,
  onSetSuccess,
  onError,
  onSetError,
}) => {
  useEffect(() => {
    if (onError) {
      const errorTime = setTimeout(() => {
        onSetError({
          isError: false,
          errorMessage: '',
        });
      }, 1500);
      return () => {
        clearTimeout(errorTime);
      };
    }
    if (onSuccess) {
      const successTime = setTimeout(() => {
        onSetSuccess({
          isSuccess: false,
          successMessage: '',
        });
      }, 1500);
      return () => {
        clearTimeout(successTime);
      };
    }
  }, [onError, onSetError, onSuccess, onSetSuccess]);

  return (
    <ToastAlert style={{ margin: '1rem', position: 'fixed', zIndex: 50 }}>
      <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded'>
        {icons === 'success' && (
          <MdCheckCircleOutline className='h-5 w-5 text-blue-600' />
        )}
        {icons === 'error' && (
          <MdErrorOutline className='h-5 w-5 text-red-600' />
        )}
      </div>
      <div className='ml-3 font-manrope font-medium'>{children}</div>
      <ToastAlert.Toggle />
    </ToastAlert>
  );
};
