import { displayData } from "@/constants";
import React from "react";

export default function ProgressBar() {
  const { currCount } = displayData;
  return (
    <div className="bg-[#DADADA] mt-10 mx-auto rounded-full h-20 w-[90%] relative">
      <div className="bg-[#004BFF] h-20 w-[80.5%] rounded-full"></div>
      <div className="absolute right-2 -top-32 text-center text-4xl tv:text-7xl font-semibold">
        <p>⛳️</p>
        <p>₹1000</p>
      </div>

      <div className="absolute right-56 text-center font-semibold text-4xl tv:text-7xl">
        <p className="text-[#004BFF]">▼</p>
        <p>₹{currCount}</p>
      </div>
    </div>
  );
}
