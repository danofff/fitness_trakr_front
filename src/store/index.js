import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import dataSlice from "./dataSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    data: dataSlice.reducer,
  },
});

export default store;
