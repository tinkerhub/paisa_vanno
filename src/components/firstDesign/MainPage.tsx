import { data } from "@/constants";
import React from "react";
import ProgressBar from "./ProgressBar";
import SubscribersCount from "./SubscribersCount";
import ConfettiTest from "./ConfettiTest";

export default function MainPage() {
  const { title, subtitle } = data;
  return (
    <div className="mt-20">
      <div className="text-center">
        <h1 className="font-extrabold text-5xl">{title}</h1>
        <p className="font-semibold">{subtitle}</p>
      </div>
      <ConfettiTest />
      <ProgressBar />
      <SubscribersCount />
    </div>
  );
}
