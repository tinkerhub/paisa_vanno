"use client";
import { trpc } from "@/app/_trpc/client";
import {
  FETCH_INTERVAL,
  INFINITE_QUERY_LIMIT,
  REVALIDATE_INTERVAL,
} from "@/constants/handlers/infinity";
import { useAppDispatch, useAppSelector } from "@/hooks/store/reducer";
import {
  popConfityPayments,
  setAwaitedUniqueConfityPayments,
  SetAwaitingConfitiPayment,
  SetAwaitingConfitiPayments,
} from "@/lib/feature/PaymentSlice";
import { TPaymentExcludedTimeStamp } from "@/types";
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
  const confityRef = useRef<NodeJS.Timeout | null>(null);
  const [playedPaymentsList, setPlayedPaymentsList] = useState<
    TPaymentExcludedTimeStamp[]
  >([]);
  const [NewPayments, setNewPayments] = useState<TPaymentExcludedTimeStamp[]>(
    []
  );
  const [curr, setCurrent] = useState<{ page: number | null }>({
    page: InitialPaymentData?.id ?? 1,
  });

  const { data } = trpc.getPaymentTotal.useQuery(
    {
      cursor: curr.page ?? undefined,
    },
    { refetchInterval: 6000 }
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (data?.hasNextPage) {
        setCurrent(() => {
          return {
            page: data.nextCursor,
          };
        });
      }
    }, 5000);
    if (data?.response.length) {
      setNewPayments((prevState) => {
        const combinedPayments = [...data.response, ...prevState];
        const uniquePayments = Array.from(
          new Map(combinedPayments.map((item) => [item.id, item])).values()
        );
        return uniquePayments.filter(
          (payment) =>
            !playedPaymentsList.some(
              (playedPayment) => playedPayment?.id === payment.id
            )
        );
      });
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [data]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    confityRef.current = setInterval(() => {
      if (NewPayments.length) {
        setPlayedPaymentsList((prev) => {
          let data = prev;
          data.push(NewPayments[0]);
          return data;
        });
        toast.success(`Pop Confitty now!!, ${NewPayments[0]?.recievedAmount}`);
        setNewPayments((prev) => {
          prev.shift();
          return [...prev];
        });
      }
    }, 1000);
    return () => {
      if (confityRef.current) {
        clearInterval(confityRef.current);
      }
    };
  }, [NewPayments]);

  return (
    <PaymentContext.Provider value={{ totalAmount: data?.totalAmount ?? 0 }}>
      {children}
    </PaymentContext.Provider>
  );
}
