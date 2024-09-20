import { data } from "@/constants";
import React from "react";

export default function SubscribersCount() {
  const { subCount } = data;
  return (
    <div className="mt-20 text-center">
      <p>
        Yet, we have <span className="font-bold text-2xl">{subCount}</span>{" "}
        Subscribers
      </p>
      <p>And still counting..</p>
    </div>
  );
}
