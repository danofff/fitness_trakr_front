import {
  fetchPublicRoutines,
  fetchMyRoutines,
  createRoutine,
  deleteRoutine,
  fetchActivities,
  createActivity,
  editActivity,
} from "../utils/apiCalls";
import { dataActions } from "./dataSlice";

//ROUTINES ACTIONS
export const getPublicRoutinesAct = () => {
  console.log("get public routines action is working");
  return async (dispatch) => {
    try {
      const routines = await fetchPublicRoutines();
      dispatch(dataActions.getRoutines(routines));
    } catch (error) {
      //handle snackbar
    }
  };
};
export const getMyRoutinesAct = (token) => {
  console.log("get my routines action is working");
  return async (dispatch) => {
    try {
      const routines = await fetchMyRoutines(token);
      dispatch(dataActions.getMyRoutines(routines));
    } catch (error) {
      //handle snackbar
      console.log(error);
    }
  };
};

export const createRoutineAct = (token, creatorName, isPublic, name, goal) => {
  console.log("create routine action is working");
  return async (dispatch) => {
    try {
      const createdRoutine = await createRoutine(token, isPublic, name, goal);
      createdRoutine.activities = [];
      createdRoutine.creatorName = creatorName;
      dispatch(dataActions.addRoutine(createdRoutine));
    } catch (error) {
      //handle snackbar
      console.log(error);
    }
  };
};

export const deleteRoutineAct = (token, id) => {
  console.log("delete routine action is working");
  return async (dispatch) => {
    try {
      await deleteRoutine(token, id);
      dispatch(dataActions.deleteRoutine(id));
    } catch (error) {
      //handle snackbar
      console.log(error);
    }
  };
};

//ACTIVITIES ACTIONS
export const getActivitiesAct = () => {
  console.log("get all activities action is working");
  return async (dispatch) => {
    try {
      const activities = await fetchActivities();
      dispatch(dataActions.getActivities(activities));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createActivityAct = (token, name, description) => {
  console.log("crate activity action is working");
  return async (dispatch) => {
    try {
      const activity = await createActivity(token, name, description);
      dispatch(dataActions.addActivity(activity));
    } catch (error) {
      //handler errors
      console.log(error);
    }
  };
};

export const editActivityAct = (token, name, description) => {
  console.log("edit activity action is working");
  return async (dispatch) => {};
};
