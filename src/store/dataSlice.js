import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    routines: [],
    myRoutines: [],
    activities: [],
  },
  reducers: {
    //ROUTINES MANIPULATIONS
    getRoutines(state, action) {
      console.log("get routines is working");
      state.routines = action.payload;
    },
    getMyRoutines(state, action) {
      console.log("get my routines is working");
      state.myRoutines = action.payload;
    },
    addRoutine(state, action) {
      console.log("add routine is working");
      state.myRoutines = [...state.myRoutines, action.payload];
    },
    deleteRoutine(state, action) {
      console.log("delete routine is working");
      state.myRoutines = state.myRoutines.filter(
        (routine) => routine.id !== action.payload
      );
    },

    //ACTIVITIES MANIPULATIONS
    getActivities(state, action) {
      console.log("get activities is working");
      state.activities = action.payload;
    },
    addActivity(state, action) {
      console.log("add activity is working");
      state.activities = [...state.activities, action.payload];
    },
    editActivity(state, action) {
      console.log("edit activity is working");
      state.activities = state.activities.filter(
        (activity) => activity.id !== action.payload
      );
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
