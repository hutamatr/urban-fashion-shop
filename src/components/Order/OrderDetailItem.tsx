import clsx from 'clsx';

interface IOrderDetailItemProps {
  title: string;
  value: string;
}

export default function OrderDetailItem({
  title,
  value,
}: Readonly<IOrderDetailItemProps>) {
  return (
    <div
      className={clsx('flex justify-between', 'sm:flex-row sm:items-center')}
    >
      <h4
        className={clsx(
          'text-sm font-semibold text-dark-brown',
          'dark:text-white-bone'
        )}
      >
        {title}
      </h4>
      <span
        className={clsx(
          'w-[50%] truncate text-right text-sm font-medium text-dark-brown',
          'dark:text-white-bone'
        )}
      >
        {value}
      </span>
    </div>
  );
}
