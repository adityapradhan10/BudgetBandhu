import accountSlice from "@/context/slices/account";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    account: accountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
