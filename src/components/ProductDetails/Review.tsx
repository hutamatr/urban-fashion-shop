import clsx from 'clsx';
import { useRef, useState } from 'react';

import { Rating } from '@components/UI';

// import { useAppSelector } from '@hooks/useReduxT';
// import ReviewList from './ReviewList';

export default function Review() {
  const [isReviewShow, setIsReviewShow] = useState(false);
  // const [reviewData, setReviewData] = useState([]);
  // const [rating, setRating] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // const { isAuthenticated } = useAppSelector((state) => state.auth);

  // const showReviewInputHandler = () => {
  //   return setIsReviewShow((prevState) => !prevState);
  // };

  // const starsRatingHandler = (value: number) => setRating(value);

  const reviewSubmitHandler = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const reviewInput = inputRef.current?.value;

    if (reviewInput?.length === 0) {
      return;
    }

    // const reviewMessage = {
    //   id: Date.now(),
    //   message: revIewinput,
    //   rating: rating,
    //   date: new Date().toLocaleString(),
    // };

    // setReviewData((prevState) => [...prevState, reviewMessage]);

    // event.target.reset();
    setIsReviewShow(false);
  };

  const reviewList =
    [].length === 0 ? (
      <p className={clsx('text-dark-brown', 'dark:text-white-bone')}>
        No Review
      </p>
    ) : (
      <></>
      // <ReviewList reviewData={reviewData} />
    );

  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6',
        'dark:border-b-white-bone'
      )}
    >
      <h1
        className={clsx('font-noto text-2xl uppercase', 'dark:text-white-bone')}
      >
        Review
      </h1>
      {/* {isAuthenticated && (
        <button
          className={clsx(
            'w-full px-4 py-3 duration-300',
            'hover:bg-dark-brown hover:text-white-bone',
            'dark:border-white-bone dark:bg-dark-brown dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown',
            'md:mx-auto md:max-w-fit'
          )}
          onClick={showReviewInputHandler}
        >
          {isReviewShow ? 'Cancel Review' : 'Write a Review'}
        </button>
      )} */}
      {isReviewShow && (
        <form
          onSubmit={reviewSubmitHandler}
          className='flex flex-col items-center justify-center gap-y-2'
        >
          <textarea
            name='review'
            id='review'
            cols={30}
            rows={5}
            ref={inputRef}
            placeholder='input Review'
            className='bg-slate-100 p-2 outline-none'
          ></textarea>
          <Rating onRating={() => {}} />
          <button
            className={clsx(
              'w-1/2 py-2 text-sm duration-300',
              'hover:bg-dark-brown hover:text-white-bone',
              'dark:border-white-bone dark:bg-dark-brown dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown'
            )}
          >
            Add Review
          </button>
        </form>
      )}
      {reviewList}
    </section>
  );
}
