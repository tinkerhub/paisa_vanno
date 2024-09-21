"use client";
import { displayData } from "@/constants";
import { PaymentContext } from "@/providers/payment";
import React, { useContext } from "react";

export default function ProgressBar() {
  let { totalCount, } = displayData;
  const { totalAmount } = useContext(PaymentContext);
  let isExceeded = (totalAmount / totalCount) * 100 >= 100;
  return (
    <div className="bg-[#DADADA]  transition-transform duration-1000  ease-linear max-md:mt-40 max-md:h-16 h-20 tv:h-52 w-[90%] mx-auto rounded-full mt-10 tv:mt-20 relative">
      <div
        style={{
          width: !isExceeded ? `${(totalAmount / totalCount) * 100}%` : "100%",
          maxWidth: "100%",
        }}
        className="bg-[#004BFF] max-md:h-16 h-20 tv:h-52  rounded-full transition-transform duration-1000  ease-linear"
      ></div>
      <div className="absolute right-0 max-md:-top-36 -top-40 tv:-top-80 text-center text-responsive-num font-bold">
        <p className="text-7xl tv:text-9xl">⛳️</p>
        <p>
          <span className="font-sans">₹</span>
          {totalCount / 1000}k
        </p>
      </div>
      <div
        style={{
          width: `${(totalAmount / totalCount) * 100}%`,
          maxWidth: "100%",
        }}
        className="relative  transition-transform duration-1000  ease-linear"
      >
        <div className="absolute -right-20  text-center font-bold text-responsive-num mt-5">
          <p
            className={`${
              isExceeded ? "text-green-500" : "text-[#004BFF]"
            } text-2xl tv:text-5xl`}
          >
            ⬤
          </p>
          <p>
            {" "}
            <span className="font-sans">₹</span>
            {isExceeded ? `${(totalAmount / 1000).toFixed(2)}k`: totalAmount }
          </p>
        </div>
      </div>
    </div>
  );
}
