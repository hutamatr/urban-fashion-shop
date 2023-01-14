import React, { useRef, useState } from "react";

import ReviewList from "./ReviewList";
import { Button, Rating } from "components/UI";

const Review = () => {
  const [isReviewShow, setIsReviewShow] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [rating, setRating] = useState(0);

  const inputRef = useRef();

  const showReviewInputHandler = () => {
    return setIsReviewShow((prevState) => !prevState);
  };

  const starsRatingHandler = (value) => setRating(value);

  const reviewSubmitHandler = (event) => {
    event.preventDefault();
    const reviewInput = inputRef.current.value;

    if (reviewInput.length === 0) {
      return;
    }

    const reviewMessage = {
      id: Date.now(),
      message: reviewInput,
      rating: rating,
      date: new Date().toLocaleString(),
    };

    setReviewData((prevState) => [...prevState, reviewMessage]);

    event.target.reset();
    setIsReviewShow(false);
  };

  const reviewList =
    reviewData.length === 0 ? (
      <p className="text-dark-brown dark:text-white-bone">No Review</p>
    ) : (
      <ReviewList reviewData={reviewData} />
    );

  return (
    <section className="flex flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6 dark:border-b-white-bone">
      <h1 className="font-noto text-2xl uppercase dark:text-white-bone">
        Review
      </h1>
      <Button
        className={
          "w-full py-3 px-4 duration-300 hover:bg-dark-brown hover:text-white-bone dark:border-white-bone dark:bg-dark-brown dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown md:mx-auto md:max-w-fit"
        }
        onClick={showReviewInputHandler}
      >
        {isReviewShow ? "Cancel Review" : "Write a Review"}
      </Button>
      {isReviewShow && (
        <form
          onSubmit={reviewSubmitHandler}
          className="flex flex-col items-center justify-center gap-y-2"
        >
          <textarea
            name="review"
            id="review"
            cols="30"
            rows="5"
            ref={inputRef}
            placeholder="Input Review"
            className="bg-slate-100 p-2 outline-none"
          ></textarea>
          <Rating onRating={starsRatingHandler} />
          <Button
            className={
              "w-1/2 py-2 text-sm duration-300 hover:bg-dark-brown hover:text-white-bone dark:border-white-bone dark:bg-dark-brown dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown"
            }
          >
            Add Review
          </Button>
        </form>
      )}
      {reviewList}
    </section>
  );
};

export default Review;
