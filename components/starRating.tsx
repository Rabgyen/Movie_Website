"use client";

import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

type Props = {
  rating: number; 
};

export default function StarRating({ rating }: Props) {
  const ratingOutOf5 = rating / 2;

  return (
    <div className="flex items-center gap-1 absolute z-100 top-0">
      {[1, 2, 3, 4, 5].map((star) => {
        if (ratingOutOf5 >= star) {
          return <FaStar key={star} className="text-yellow-400" />;
        } else if (ratingOutOf5 >= star - 0.5) {
          return <FaStarHalfAlt key={star} className="text-yellow-400" />;
        } else {
          return <FaRegStar key={star} className="text-gray-400" />;
        }
      })}
    </div>
  );
}