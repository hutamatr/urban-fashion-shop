import clsx from 'clsx';
import { MdOutlineStar } from 'react-icons/md';

interface IReviewListProps {
  reviewData: [
    {
      id: number;
      message: string;
      rating: number;
      date: string;
      user: {
        name: string;
        image: string;
        email: string;
        phone: string;
        createdAt: string;
      };
    },
  ];
}

export default function ReviewList({ reviewData }: Readonly<IReviewListProps>) {
  return (
    <ul className='flex max-h-60 w-full flex-col gap-y-4 overflow-y-auto p-4'>
      {reviewData?.map((review) => {
        return (
          <li
            key={review.id}
            className={clsx(
              'flex flex-col gap-y-2 rounded-md border border-dark-brown p-4',
              'dark:border-white-bone'
            )}
          >
            <p className={clsx('text-lg font-medium', 'dark:text-white-bone')}>
              {review.message}
            </p>
            <span
              className={clsx(
                'flex items-center gap-x-1 text-sm',
                'dark:text-white-bone'
              )}
            >
              <MdOutlineStar />
              {review.rating}
            </span>
            <span className={clsx('text-xs', 'dark:text-white-bone')}>
              {review.date}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
