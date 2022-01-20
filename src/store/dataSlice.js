import { createSlice, current } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    routines: [],
    myRoutines: [],
    userRoutines: [],
    activityRoutines: [],
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
    getUserRoutines(state, action) {
      console.log("get user routines is working");
      state.userRoutines = action.payload;
    },
    getActivityRoutines(state, action) {
      console.log("get routines by activity is working");
      state.activityRoutines = action.payload;
    },
    addRoutine(state, action) {
      console.log("add routine is working");
      state.myRoutines = [...state.myRoutines, action.payload];
    },
    editRoutine(state, action) {
      console.log("edit routine is working");
      const currentState = current(state);

      const editedRoutine = action.payload;

      const routine = currentState.myRoutines.find(
        (routine) => routine.id === action.payload.id
      );
      const activities = [...routine.activities];
      editedRoutine.activities = activities;

      const filteredRoutines = currentState.myRoutines.filter(
        (routine) => routine.id !== editedRoutine.id
      );

      state.myRoutines = [...filteredRoutines, editedRoutine];
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

    //ROUTINES ACTIVITIES
    addRoutineActivity(state, action) {
      console.log("add routine activity");
      const currentState = current(state);
      const addedRoutineActivity = action.payload.routineActivity;
      const routine = currentState.myRoutines.find(
        (routine) => routine.id === addedRoutineActivity.routineId
      );

      const newActivities = [...routine.activities];
      const activity = currentState.activities.find(
        (activity) => activity.id === addedRoutineActivity.activityId
      );

      newActivities.push({
        ...addedRoutineActivity,
        name: activity.name,
        description: activity.description,
      });

      const newRoutine = { ...routine, activities: newActivities };

      const myRoutinesFiltered = currentState.myRoutines.filter(
        (routine) => routine.id !== addedRoutineActivity.routineId
      );
      console.log(myRoutinesFiltered);

      state.myRoutines = [...myRoutinesFiltered, newRoutine];
    },
    deleteRoutineActivity(state, action) {
      console.log("routine activity delete");
      const currentState = current(state);

      const routine = currentState.myRoutines.find(
        (routine) => routine.id === action.payload.routineId
      );

      const newRoutinesActivities = routine.activities.filter(
        (activity) => activity.id !== action.payload.id
      );

      const newRoutine = { ...routine, activities: newRoutinesActivities };

      const filteredRoutinesState = currentState.myRoutines.filter(
        (routine) => routine.id !== action.payload.routineId
      );

      state.myRoutines = [...filteredRoutinesState, newRoutine];
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
