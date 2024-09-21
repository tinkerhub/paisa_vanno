import { TPaymentExcludedTimeStamp } from "@/types";
import { Payments } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// add in state here.
export type TPaymentState = {
  // OrganizedPayment:
  totalAmount: number;
  AwaitingConfitiPayment: TPaymentExcludedTimeStamp[];
};

const PaymentSlice = createSlice({
  name: "Payment",
  initialState: {
    AwaitingConfitiPayment: [],
    totalAmount: 0,
  } as TPaymentState,
  reducers: {
    /**
     * This function allows you to add in Payment, but may have Previous Datas.
     * @param state Current sate
     * @param action Prisma Payment Payload
     */
    SetAwaitingConfitiPayment(
      state,
      action: PayloadAction<TPaymentExcludedTimeStamp[]>
    ) {
      state.AwaitingConfitiPayment = [
        ...action.payload,
        ...state.AwaitingConfitiPayment,
      ];
    },
    SetAwaitingConfitiPayments(
      state,
      action: PayloadAction<TPaymentExcludedTimeStamp[]>
    ) {
      // Optionally, you might want to ensure uniqueness if that's a requirement
      let all_pay = [...action.payload, ...state.AwaitingConfitiPayment];
      const uniquePayments = Array.from(
        new Map(all_pay.map((item) => [item.id, item])).values()
      );
      return {
        ...state,
        AwaitingConfitiPayment: uniquePayments,
      };
    },
    /**
     * This function allows you to add in Payment, but have unique value to itF
     * @param state Current sate
     * @param action Prisma Payment Payload
     */
    setAwaitedUniqueConfityPayments(
      state,
      action: PayloadAction<TPaymentExcludedTimeStamp[]>
    ) {
      let all = [...state.AwaitingConfitiPayment, ...action.payload];
      const uniqueArray = Array.from(new Set(all));

      state.AwaitingConfitiPayment = uniqueArray ?? [];
    },
    popConfityPayments(state) {
      if (state.AwaitingConfitiPayment.length) {
        state?.AwaitingConfitiPayment.shift();
      }
    },
  },
});

export const {
  SetAwaitingConfitiPayment,
  popConfityPayments,
  setAwaitedUniqueConfityPayments,
  SetAwaitingConfitiPayments,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
