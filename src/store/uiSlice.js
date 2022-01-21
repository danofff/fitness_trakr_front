import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    snackbar: {
      isSnackbarOpen: false,
      type: "default",
      text: "some default text",
    },
  },
  reducers: {
    setSnackbar(state, action) {
      console.log("setsnackbar is working");
      state.snackbar = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
