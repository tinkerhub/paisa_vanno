import React from "react";

export default function Navbar() {
  return (
    <nav className="">
      <div className="py-4 px-8 flex justify-between items-center">
        <p className="font-bold">TinkerSpace Carnival</p>
        <p className="font-bold">
          Tinker<span className="font-medium">Hub</span>
        </p>
      </div>
      <div className="h-[1.2px] bg-black w-full"></div>
    </nav>
  );
}
