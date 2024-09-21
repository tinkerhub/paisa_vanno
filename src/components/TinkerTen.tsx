import { Climate_Crisis } from "next/font/google";
import React from "react";

const ClimateCrisis = Climate_Crisis({ subsets: ["latin"] });

export default function TinkerTen() {
  return (
    <div className="absolute max-md:bottom-[15%] max-md:right-[40%] bottom-[4%] right-[4%]">
      <div className="flex">
        <div className="relative w-full h-full">
          <p className="absolute  top-4 right-6 tv:top-10 tv:right-14 -rotate-90 origin-top-right transform translate-y-full font-black text-lg tv:text-7xl whitespace-nowrap  tv:scale-75">
            Tinker<span className="font-medium">Hub</span>
          </p>
        </div>
        <div className={ClimateCrisis.className}>
          <div className="flex text-[#FF4010] text-[7rem] tv:text-[20rem] ">
            <p className="transform scale-x-[-1] mr-1">1 </p>
            <p className=""> 0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
