"use client";
import { trpc } from "@/app/_trpc/client";
import { PaymentContext } from "@/providers/payment";
import React, { useContext } from "react";
import numeral from "numeral";
export default function HeadingText() {
  const data = trpc.useUtils().getPaymentTotal.getData();
  const { totalAmount, totalSubscribers } = useContext(PaymentContext);
  let Numberals = numeral(totalSubscribers);
  let totalSubscribersPlusNumerals = numeral(totalSubscribers + 1);
  return (
    <div className="w-[89%] mx-auto mt-5  md:mt-20  tv:mt-52 ">
      <div className="text-responsive-h1 font-medium tracking-tighter max-md:leading-[2.5rem] leading-[3.5rem] tv:leading-[7rem]">
        <p className="">We need more hands to do this.</p>
        <p className="">What about pushing this blue bar a little further</p>
      </div>
      <p className="text-responsive-h2 mt-4  tv:mt-16">
        currently we have {Numberals.format("Oo")} recurring donors, we want you
        to be the {totalSubscribersPlusNumerals.format("Oo")}.
      </p>
    </div>
  );
}
