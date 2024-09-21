"use client";
import { trpc } from "@/app/_trpc/client";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

import { useAppDispatch } from "@/hooks/store/reducer";
import { TPaymentExcludedTimeStamp } from "@/types";
import { Payments } from "@prisma/client";
import React, { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { TConductorInstance } from "react-canvas-confetti/dist/types";
import { SUBSCRIPTION_STARTED_AT } from "@/constants/handlers/infinity";

type PaymentState = {
  totalAmount: number;
  totalSubscribers: number;
};

export const PaymentContext = createContext<PaymentState>({
  totalAmount: 0,
  totalSubscribers: 40,
});

export function PaymentProvider({
  children,
  InitialPaymentData,
}: {
  children: React.ReactNode;
  InitialPaymentData: Payments | null;
}) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showConfetti, setshowConfetti] = useState(false);
  const Conff = useRef<TConductorInstance | null>(null);
  const confityRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setshowConfetti(false);
  }, [showConfetti, setshowConfetti]);

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

  useEffect(() => {
    confityRef.current = setInterval(() => {
      if (NewPayments.length) {
        setPlayedPaymentsList((prev) => {
          let data = prev;
          data.push(NewPayments[0]);
          return data;
        });
        if (Conff.current) {
          Conff.current?.shoot();
        }
        toast.success(`New Donor, ₹${NewPayments[0]?.recievedAmount}`, {
          icon: `🎉`,
          duration: 2000,
          className: "text-2xl",
        });

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
    <PaymentContext.Provider
      value={{
        totalAmount: data?.totalAmount ?? 0,
        totalSubscribers:
          data?.totalCurrentSubscribers ?? SUBSCRIPTION_STARTED_AT,
      }}
    >
      <div className="absolute top-0 z-50">
        <Fireworks
          decorateOptions={(deco) => {
            let data = deco;
            data.particleCount = 150;
            return data;
          }}
          onInit={({ conductor, confetti }) => {
            Conff.current = conductor;
          }}
          globalOptions={{
            useWorker: true,
          }}
        />
      </div>
      {children}
    </PaymentContext.Provider>
  );
}
