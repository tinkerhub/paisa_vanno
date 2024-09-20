import { Climate_Crisis } from "next/font/google";
import React from "react";

const ClimateCrisis = Climate_Crisis({ subsets: ["latin"] });

export default function TinkerTen() {
  return (
    <div className="absolute bottom-[4%] right-[4%]">
      <div className="flex">
        <p className="rotate-90 transform scale-x-[-1] font-extrabold text-lg tv:text-7xl max-w-fit mr-10  tv:scale-75">
          Tinker<span className="font-medium">Hub</span>
        </p>
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
