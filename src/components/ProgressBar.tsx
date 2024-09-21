"use client";
import { trpc } from "@/app/_trpc/client";
import { displayData } from "@/constants";
import { PaymentContext } from "@/providers/payment";
import React, { useContext, useEffect, useRef } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

export default function ProgressBar() {
  const { currCount, totalCount } = displayData;
  const { totalAmount } = useContext(PaymentContext);
  return (
    <div className="bg-[#DADADA] h-20 tv:h-52 w-[90%] mx-auto rounded-full mt-10  relative">
      <div className="bg-[#004BFF] h-20 tv:h-52 w-[80.5%] rounded-full"></div>
      <div className="absolute right-0 -top-40 tv:-top-80 text-center text-responsive-num font-bold">
        <p className="text-7xl tv:text-9xl">⛳️</p>
        <p>₹{totalCount}k</p>
      </div>

      <div className="absolute right-56 tv:right-[16%] tv:top-60 text-center font-bold text-responsive-num">
        <p className="text-[#004BFF] text-2xl tv:text-5xl">⬤</p>
        <p>₹{totalAmount}</p>
      </div>
      <div className="absolute top-20 text-2xl">
        {/* {isFetching ? "Somethign is fetching..." : ""} */}
      </div>
    </div>
  );
}
