import { configureStore } from "@reduxjs/toolkit";
import PackageSlice from "@/lib/feature/PaymentSlice";

export const makeStore = () => {
  return configureStore({
    devTools: true,
    reducer: {
      paymentSlice: PackageSlice,
    },
  });
};

// Infer the type of makeStore
export type AppDispatch = AppStore["dispatch"];

export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
