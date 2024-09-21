import { Payments } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// add in state here.
export type TPaymentState = {
  // OrganizedPayment:
  totalAmount: number;
  AwaitingConfitiPayment: Payments[];
};

const PaymentSlice = createSlice({
  name: "Payment",
  initialState: {} as TPaymentState,
  reducers: {
    /**
     * This function allows you to add in Payment, but may have Previous Datas.
     * @param state Current sate
     * @param action Prisma Payment Payload
     */
    SetAwaitingConfitiPayment(state, action: PayloadAction<Payments[]>) {
      state.AwaitingConfitiPayment = [
        ...state.AwaitingConfitiPayment,
        ...action.payload,
      ];
    },
    /**
     * This function allows you to add in Payment, but have unique value to itF
     * @param state Current sate
     * @param action Prisma Payment Payload
     */
    setAwaitedUniqueConfityPayments(state, action: PayloadAction<Payments[]>) {
      let all = [...state.AwaitingConfitiPayment, ...action.payload];
      const uniqueArray = Array.from(
        new Map(all.map((item) => [item.id, item])).values()
      ).sort((a, b) => a.id - b.id);
      state.AwaitingConfitiPayment = uniqueArray ?? [];
    },
    popConfityPayments(state) {
      state.AwaitingConfitiPayment.shift();
    },
  },
});

export const {
  SetAwaitingConfitiPayment,
  popConfityPayments,
  setAwaitedUniqueConfityPayments,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
