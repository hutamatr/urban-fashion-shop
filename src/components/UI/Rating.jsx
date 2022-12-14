import React, { useState } from "react";

import { MdOutlineStar } from "react-icons/md";

const StarRating = ({ onRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const mouseEnterHandler = (index) => setHover(index);
  const mouseLeaveHandler = (rating) => setHover(rating);
  const resetRatingHandler = () => {
    setHover(0);
    setRating(0);
  };

  const ratingHandler = (index) => {
    setRating(index);
    onRating(index);
  };

  return (
    <div className="flex gap-x-1 py-2">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`bg-transparent duration-300 ${
              index <= (rating && hover) ? "text-yellow-300" : "text-white"
            }`}
            onClick={ratingHandler.bind(this, index)}
            onDoubleClick={resetRatingHandler}
            onMouseEnter={mouseEnterHandler.bind(this, index)}
            onMouseLeave={mouseLeaveHandler.bind(this, rating)}
          >
            <span className="text-xl">
              <MdOutlineStar />
            </span>
          </button>
        );
      })}
      <span className="text-dark-brown dark:text-white-bone">{rating}/5</span>
    </div>
  );
};

export default StarRating;
