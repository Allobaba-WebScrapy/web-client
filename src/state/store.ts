import { configureStore } from "@reduxjs/toolkit";
import AutoScout24Slice from "./autoscout24/AutoScout24Slice";
import PagesJaunesSlice from "./pagesJaunes/PagesJaunesSlice";
// import OrangeSlice from "./orange/OrangeSlice";

export const store = configureStore({
  reducer: {
    autoscout24: AutoScout24Slice,
    pagesJaunes: PagesJaunesSlice,
    // orange:OrangeSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
