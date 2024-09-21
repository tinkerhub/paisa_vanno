import HeadingText from "@/components/HeadingText";
import Ellipse from "@/components/Ellipse";
import ProgressBar from "@/components/ProgressBar";
import TinkerTen from "@/components/TinkerTen";
import React from "react";

export default function page() {
  return (
    <div className="min-w-[100dvw]  max-h-[calc(100dvh-4rem)] overflow-hidden min-h-[calc(100dvh)]   relative">
      
      <HeadingText />
      <ProgressBar />
      <Ellipse />
      <TinkerTen />
    </div>
  );
}
