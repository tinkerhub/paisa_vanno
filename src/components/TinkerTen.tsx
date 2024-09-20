import { Climate_Crisis } from "next/font/google";
import React from "react";

const ClimateCrisis = Climate_Crisis({ subsets: ["latin"] });

export default function TinkerTen() {
  return (
    <div className="absolute bottom-[10%] right-[8%]">
      <div className="flex">
        <p className="rotate-90 font-bold text-lg max-w-fit mr-2">
          Tinker<span className="font-medium">Hub</span>
        </p>
        <div className={ClimateCrisis.className}>
          <div className="flex text-[#FF4010] text-8xl font-bold">
            <p className="transform scale-x-[-1] ">1</p>
            <p className="">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
