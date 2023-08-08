import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  LegacyRef,
} from 'react';
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from 'react-icons/md';

type RefType = HTMLInputElement | HTMLTextAreaElement;

interface IInputFormProps
  extends DetailedHTMLProps<InputHTMLAttributes<RefType>, RefType> {
  title: string;
  isTextArea?: boolean;
  isPassword?: boolean;
  isPassView?: boolean;
  onViewPasswordHandler?: () => void;
  className?: string;
  errors?: React.ReactNode;
}

const Input = forwardRef<unknown, IInputFormProps>(
  (
    {
      title,
      isTextArea,
      isPassword,
      isPassView,
      onViewPasswordHandler,
      className,
      errors,
      ...props
    }: IInputFormProps,
    ref
  ) => {
    let inputContent = (
      <input
        {...props}
        ref={ref as LegacyRef<HTMLInputElement>}
        className={clsx(
          className,
          'w-full rounded border-2 bg-white-bone p-2 font-medium outline-none',
          'dark:bg-dark-brown dark:text-white-bone dark:placeholder:text-white-bone',
          'placeholder:text-sm focus:ring-0'
        )}
      />
    );

    if (isTextArea) {
      inputContent = (
        <textarea
          {...props}
          rows={5}
          cols={50}
          ref={ref as LegacyRef<HTMLTextAreaElement>}
          className={clsx(
            className,
            'w-full border-none bg-white-bone p-2 text-sm font-medium outline-none',
            'dark:bg-dark-brown dark:text-white-bone dark:placeholder:text-white-bone',
            'placeholder:text-sm focus:ring-0'
          )}
        ></textarea>
      );
    }
    return (
      <div className='flex flex-col gap-y-1'>
        <label
          className={clsx(
            'text-xs font-medium text-dark-brown',
            'dark:text-white-bone'
          )}
        >
          {title}
        </label>
        {!isPassword && inputContent}
        {isPassword && (
          <div className='relative flex items-center'>
            {inputContent}
            <span className='absolute right-0'>
              {isPassView ? (
                <MdRemoveRedEye
                  className='mr-2 cursor-pointer text-xl'
                  onClick={onViewPasswordHandler}
                  fill='#5B5B60'
                />
              ) : (
                <MdOutlineRemoveRedEye
                  className='mr-2 cursor-pointer text-xl'
                  onClick={onViewPasswordHandler}
                  fill='#5B5B60'
                />
              )}
            </span>
          </div>
        )}
        {errors}
      </div>
    );
  }
);

export default Input;
