"use client";
import { trpc } from "@/app/_trpc/client";
import {
  FETCH_INTERVAL,
  INFINITE_QUERY_LIMIT,
  REVALIDATE_INTERVAL,
} from "@/constants/handlers/infinity";
import { Payments } from "@prisma/client";
import React, { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type PaymentState = {
  totalAmount: number;
};

export const PaymentContext = createContext<PaymentState>({
  totalAmount: 0,
});

export function PaymentProvider({
  children,
  InitialPaymentData,
}: {
  children: React.ReactNode;
  InitialPaymentData: Payments | null;
}) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [curr, setCurrent] = useState<number | null>(
    InitialPaymentData?.id ?? null
  );
  const { data, refetch } = trpc.getPaymentTotal.useQuery(
    {
      cursor: curr ?? undefined,
    },
    { refetchInterval: FETCH_INTERVAL }
  );
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch
  },[data])
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!data) return;
      if (data.hasNextPage) {
        toast.success("fetching...");
        setCurrent((prev) => {
          if (!prev) return null;
          return prev + INFINITE_QUERY_LIMIT;
        });
      }
    }, REVALIDATE_INTERVAL);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  return (
    <PaymentContext.Provider value={{ totalAmount: data?.totalAmount ?? 0 }}>
      {children}
    </PaymentContext.Provider>
  );
}
