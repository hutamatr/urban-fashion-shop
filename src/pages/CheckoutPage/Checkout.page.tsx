import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import CheckoutSummary from '@components/Checkout/CheckoutSummary';
import Payment from '@components/Checkout/Payment';
import { Loading } from '@components/UI';
import Input from '@components/UI/Input';

import { paymentOrder } from '@store/order.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { fetchUser } from '@store/user.slice';

import useMidtransSnap from '@hooks/useMidtransSnap';
import { checkoutFormSchema } from '@utils/formSchema';

import 'react-phone-number-input/style.css';

type FormSchemaType = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const [snapShow, setSnapShow] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
  });

  const { user, status: userStatus } = useAppSelector((state) => state.user);
  const { status: orderStatus } = useAppSelector((state) => state.order);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { snapEmbed } = useMidtransSnap();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      setValue('firstName', user.first_name);
      setValue('lastName', user.last_name);
      setValue('email', user.email);
      setValue('postalCode', user.postal_code);
      setValue('city', user.city);
      setValue('address', user.address);
      setPhoneNumber(user.phone_number);
    }
  }, [setValue, user]);

  const totalCartItems = cart?.reduce((curr, item) => {
    return curr + item.cart_item.quantity;
  }, 0);

  const onPaymentHandler: SubmitHandler<FormSchemaType> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    const paymentInput: IOrder = {
      first_name: data.firstName,
      last_name: data.lastName,
      address: data.address,
      city: data.city,
      postal_code: data.postalCode,
      phone_number: phoneNumber,
    };

    const res = await dispatch(paymentOrder(paymentInput));

    if (res.meta.requestStatus === 'fulfilled') {
      setSnapShow(true);
      const payload = res.payload as IOrderResponse;
      snapEmbed(payload.transaction.snap_token, 'snap-container', {
        onSuccess: (result) => {
          setSnapShow(false);
          navigate(`/order-status?transaction_id=${result?.order_id}`, {
            replace: true,
          });
          toast.success(result.status_message, { duration: 1500 });
        },
        onPending: (result) => {
          setSnapShow(false);
          navigate(`/order-status?transaction_id=${result.order_id}`, {
            replace: true,
          });
          toast.success(result.status_message, { duration: 1500 });
        },
        onError: (result) => {
          setSnapShow(false);
          toast.error(result.status_message, { duration: 1500 });
        },
        onClose: () => {
          setSnapShow(false);
          navigate(`/order-status?transaction_id=${payload.transaction.id}`, {
            replace: true,
          });
          toast.error('Payment failed', { duration: 1500 });
        },
      });
      reset();
    }

    if (res.meta.requestStatus === 'rejected') {
      const payload = res.payload as IError;
      payload.message.forEach((message: string) => {
        toast.error(message, { duration: 1500 });
      });
    }
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />

      <section className={clsx('layout mb-6 flex flex-col gap-y-4', 'lg:mb-0')}>
        <div
          className={clsx(
            'my-6 flex flex-col items-start justify-center gap-y-4',
            'md:my-16 md:min-h-fit'
          )}
        >
          <h1
            className={clsx(
              'font-noto text-4xl uppercase',
              'dark:text-white-bone',
              'md:text-5xl'
            )}
          >
            Checkout
          </h1>
        </div>

        <section
          className={clsx(
            'grid grid-rows-1 gap-y-8',
            'lg:grid-cols-[3fr_1.5fr] lg:border-t lg:border-t-dark-brown',
            'dark:lg:border-t-white-bone'
          )}
        >
          {!snapShow && (
            <>
              {userStatus === 'pending' ? (
                <Loading />
              ) : (
                <div className={clsx('flex flex-col gap-y-8', 'lg:p-6')}>
                  <form
                    className='flex flex-col gap-y-4'
                    onSubmit={handleSubmit(onPaymentHandler)}
                    id='checkout-form'
                  >
                    <h2
                      className={clsx(
                        'text-2xl font-semibold',
                        'dark:text-white-bone'
                      )}
                    >
                      Delivery
                    </h2>
                    <div
                      className={clsx(
                        'grid grid-cols-1 gap-4',
                        'md:grid-cols-2'
                      )}
                    >
                      <Input
                        title='First name'
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
                        title='Last name'
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
                    </div>

                    <div
                      className={clsx(
                        'grid grid-cols-1 gap-4',
                        'md:grid-cols-2'
                      )}
                    >
                      <Input
                        type='email'
                        title='Email'
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

                    <div
                      className={clsx(
                        'grid grid-cols-1 gap-4',
                        'md:grid-cols-2'
                      )}
                    >
                      <Input
                        title='City'
                        type='text'
                        {...register('city', { required: true })}
                        aria-invalid={errors.city ? 'true' : 'false'}
                        errors={
                          errors.city && (
                            <span className='block text-xs text-red-800'>
                              {errors.city?.message}
                            </span>
                          )
                        }
                      />
                      <Input
                        title='Post Code/Zip'
                        type='text'
                        {...register('postalCode', { required: true })}
                        aria-invalid={errors.postalCode ? 'true' : 'false'}
                        errors={
                          errors.postalCode && (
                            <span className='block text-xs text-red-800'>
                              {errors.postalCode?.message}
                            </span>
                          )
                        }
                      />
                    </div>

                    <Input
                      title='Address'
                      type='text'
                      isTextArea
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
                  </form>
                  <Payment />
                </div>
              )}
            </>
          )}

          <div
            id='snap-container'
            className={clsx(
              snapShow ? 'block' : 'hidden',
              'mx-auto mb-8 flex h-full w-full items-center justify-center rounded'
            )}
          ></div>

          <CheckoutSummary
            totalCartItems={totalCartItems}
            isSubmitting={isSubmitting}
            status={orderStatus}
            isSnapShow={snapShow}
          />
        </section>
      </section>
    </>
  );
}
