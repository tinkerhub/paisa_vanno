import Ellipse from "@/components/Ellipse";
import HeadingText from "@/components/HeadingText";
import ProgressBar from "@/components/ProgressBar";
import TinkerTen from "@/components/TinkerTen";
import React from "react";

export default function page() {
  return (
    <div className=" w-[100vw] min-h-[100vh] overflow-hidden relative ">
      <HeadingText />
      <ProgressBar />
      <Ellipse />
      <TinkerTen />
    </div>
  );
}
