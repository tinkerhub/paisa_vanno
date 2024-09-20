import { trpc } from "@/app/_trpc/client";
import { displayData } from "@/constants";
import React from "react";

export default function ProgressBar() {
  const { currCount, totalCount } = displayData;
  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    trpc.getPaymentTotal.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
      }
    );

  return (
    <div className="bg-[#DADADA] h-20 tv:h-52 w-[90%] mx-auto rounded-full mt-10  relative">
      <div className="bg-[#004BFF] h-20 tv:h-52 w-[80.5%] rounded-full"></div>
      <div className="absolute right-0 -top-40 tv:-top-80 text-center text-responsive-num font-bold">
        <p className="text-7xl tv:text-9xl">⛳️</p>
        <p>₹{totalCount}</p>
      </div>

      <div className="absolute right-56 tv:right-[16%] tv:top-60 text-center font-bold text-responsive-num">
        <p className="text-[#004BFF] text-2xl tv:text-5xl">⬤</p>
        <p>₹{currCount}</p>
      </div>
    </div>
  );
}
