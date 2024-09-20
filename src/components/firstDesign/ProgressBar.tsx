import React from "react";

export default function ProgressBar() {
  return (
    <div className="bg-black/80 mt-10 mx-auto rounded-full h-10 w-[70rem] relative">
      <div className="bg-green-300 h-10 w-[80.5%] rounded-full"></div>

      <div className="absolute right-48 text-center font-semibold text-2xl">
        <p>▼</p>
        <p>₹80500</p>
      </div>
      <div className="flex flex-col items-end font-semibold text-2xl">
        <p>▼</p>
        <p>₹100k</p>
      </div>
    </div>
  );
}
