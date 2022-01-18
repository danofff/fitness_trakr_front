import makeHeaders from "./makeHeaders";

const apiBase = "http://localhost:8000/api";
//register user api call
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${apiBase}/users/register`, {
      method: "POST",
      headers: makeHeaders(),
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const result = await response.json();
      //set user right here or return value
      return result;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  } catch (error) {
    console.log(error.message);
  }
};

//login user api call
export const loginUser = async (userData) => {
  const response = await fetch(`${apiBase}/users/login`, {
    method: "POST",
    headers: makeHeaders(),
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    const result = await response.json();

    //return user value;
    return result;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//fetching all public routines api call
export const fetchPublicRoutines = async () => {
  const response = await fetch(`${apiBase}/routines`, {
    headers: makeHeaders(),
  });
  if (response.ok) {
    const routines = await response.json();
    return routines;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//fetch all activities api call
export const fetchActivities = async () => {
  const response = await fetch(`${apiBase}/activities`, {
    headers: makeHeaders(),
  });
  if (response.ok) {
    const activities = await response.json();
    return activities;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//fetch routines by username
export const fetchRoutinesByUsername = async (username, token) => {
  if (token) {
    const responseMe = await fetch(`${apiBase}/users/me`, {
      headers: makeHeaders(token),
    });
    if (responseMe.ok) {
      const userName = await responseMe.json().username;
      const response = await fetch(`${apiBase}/users/:${userName}/routines`, {
        headers: makeHeaders(token),
      });
      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } else {
      const error = await responseMe.json();
      throw new Error(error.error);
    }
  } else {
    const response = await fetch(`${apiBase}/users/:${username}/routines`);
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  }
};
