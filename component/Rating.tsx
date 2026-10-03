"use client";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  value?: number;
  max?: number;
}

export default function Rating({ value = 0, max = 5 }: RatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1 text-amber-500">
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          if (value >= starValue) {
            return <FaStar key={index} className="h-4 w-4" />;
          } else if (value >= starValue - 0.5) {
            return <FaStarHalfAlt key={index} className="h-4 w-4" />;
          } else {
            return <FaRegStar key={index} className="h-4 w-4 text-gray-300" />;
          }
        })}
      </div>
      <span className="text-xs font-semibold text-gray-600">
        {value ? value.toFixed(1) : "0.0"}
      </span>
    </div>
  );
}