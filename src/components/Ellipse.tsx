import React from "react";

export default function Ellipse() {
  return (
    <div className="absolute bottom-[35%] w-full">
      <div className="relative  border-red-500">
        <div className="absolute z-10  left-[-35%]  w-[130vw] h-[130vw] border-2 rounded-full bg-[#FFD506]"></div>
        <div className="absolute z-20 mt-[6%] left-[-24%]  w-[100vw] h-[100vw] rounded-full bg-[#FF4010]"></div>
        <div className="absolute z-30 mt-[13%] left-[-7%]  w-[60vw] h-[60vw] rounded-full bg-[#004BFF]"></div>
      </div>
    </div>
  );
}
