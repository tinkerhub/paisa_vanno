import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// add in state here.
export type TPaymentState = {
  // OrganizedPayment:
  totalAmount: number;
};

const PaymentSlice = createSlice({
  name: "Payment",
  initialState: {} as TPaymentState,
  reducers: {
    setOrganizedPackage(state, action: PayloadAction<number>) {
      state.totalAmount += action.payload;
    },
  },
});

export const {} = PaymentSlice.actions;
export default PaymentSlice.reducer;
