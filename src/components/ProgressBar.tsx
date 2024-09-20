import { displayData } from "@/constants";
import React from "react";

export default function ProgressBar() {
  const { currCount } = displayData;
  return (
    <div className="bg-[#DADADA] h-20 tv:h-52 w-[90%] mx-auto rounded-full mt-10  relative">
      <div className="bg-[#004BFF] h-20 tv:h-52 w-[80.5%] rounded-full"></div>
      <div className="absolute right-0 -top-40 text-center text-responsive-num font-bold">
        <p className="text-7xl">⛳️</p>
        <p>₹1000</p>
      </div>

      <div className="absolute right-56 text-center font-bold text-responsive-num">
        <p className="text-[#004BFF] text-3xl">⬤</p>
        <p>₹{currCount}</p>
      </div>
    </div>
  );
}
