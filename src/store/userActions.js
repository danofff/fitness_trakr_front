import { userActions } from "./userSlice";
import { loginUser, registerUser } from "../utils/apiCalls";
// import { fetchPosts } from "./postsActions";
// import { uiActions } from "./uiSlice";

export const loginUserAct = (username, password) => {
  return async (dispatch) => {
    try {
      console.log("user actions working");
      const user = await loginUser({ username, password });
      dispatch(userActions.loginUser(user));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const registerUserAct = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await registerUser({ username, password });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const fetchUserAct = () => {
  return (dispatch) => {
    const userFromStorage = localStorage.getItem("user");
    const user = JSON.parse(userFromStorage);
    if (user) {
      dispatch(userActions.fetchUserFromLocal(user));
    }
  };
};
