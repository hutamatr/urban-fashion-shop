import clsx from 'clsx';
import { useState } from 'react';
import { MdOutlineStar } from 'react-icons/md';

interface IRatingProps {
  onRating: (_rating: number) => void;
}

export function Rating({ onRating }: IRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const mouseEnterHandler = (index: number) => setHover(index);
  const mouseLeaveHandler = (rating: number) => setHover(rating);
  const resetRatingHandler = () => {
    setHover(0);
    setRating(0);
  };

  const ratingHandler = (index: number) => {
    setRating(index);
    onRating(index);
  };

  return (
    <div className='flex gap-x-1 py-2'>
      {[...Array(5)].map((rate, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={rate}
            className={clsx(
              index <= (rating && hover) ? 'text-yellow-300' : 'text-white',
              'bg-transparent duration-300'
            )}
            onClick={ratingHandler.bind(null, index)}
            onDoubleClick={resetRatingHandler}
            onMouseEnter={mouseEnterHandler.bind(null, index)}
            onMouseLeave={mouseLeaveHandler.bind(null, rating)}
          >
            <span className='text-xl'>
              <MdOutlineStar />
            </span>
          </button>
        );
      })}
      <span className={clsx('text-dark-brown', 'dark:text-white-bone')}>
        {rating}/5
      </span>
    </div>
  );
}
