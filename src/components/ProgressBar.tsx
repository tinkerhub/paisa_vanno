import { displayData } from "@/constants";
import React from "react";

export default function ProgressBar() {
  const { currCount, totalCount } = displayData;
  return (
    <div className="bg-[#d4d1d1] max-md:mt-40 max-md:h-16 h-20 tv:h-52 w-[90%] mx-auto rounded-full mt-10 tv:mt-20 relative shadow-2xl">
      <div className="bg-[#004BFF] max-md:h-16 h-20 tv:h-52 w-[80.5%] rounded-full"></div>
      <div className="absolute right-0 max-md:-top-36 -top-40 tv:-top-80 text-center text-responsive-num font-bold">
        <p className="text-7xl tv:text-9xl">⛳️</p>
        <p>₹{totalCount}</p>
      </div>
      <div className="relative w-[80.5%] ">
        <div className="absolute -right-20  text-center font-bold text-responsive-num mt-5">
          <p className="text-[#004BFF] text-2xl tv:text-5xl">⬤</p>
          <p>₹{currCount}</p>
        </div>
      </div>
    </div>
  );
}
