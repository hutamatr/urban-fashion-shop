import React from 'react';

import { MdOutlineStar } from 'react-icons/md';

const ReviewList = ({ reviewData }) => {
  return (
    <ul className='flex max-h-60 w-full flex-col gap-y-4 overflow-y-auto p-4'>
      {reviewData?.map((review) => {
        return (
          <li
            key={review.id}
            className='flex flex-col gap-y-2 rounded-md border border-dark-brown p-4 dark:border-white-bone'
          >
            <p className='text-lg font-medium dark:text-white-bone'>
              {review.message}
            </p>
            <span className='flex items-center gap-x-1 text-sm dark:text-white-bone'>
              <MdOutlineStar />
              {review.rating}
            </span>
            <span className='text-xs dark:text-white-bone'>{review.date}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
