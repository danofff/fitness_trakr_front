import { useContext } from "react";
import { UserContext } from "../store/userContext";

import { deleteRoutine } from "../utils/apiCalls";
import ActivityForRoutine from "./ActivityForRoutine";

import classes from "./Routine.module.css";

const Routine = ({ routine }) => {
  const userCtx = useContext(UserContext);

  const deleteHandler = async (event) => {
    try {
      await deleteRoutine(userCtx.user.token, routine.id);
    } catch (error) {
      //handle error w snackbar?
    }
  };

  return (
    <div className={classes.routine}>
      <h2>{routine.name}</h2>
      <p>{routine.goal}</p>
      {/* WRAP USERNAME TO LINK */}
      <p>{routine.creatorName}</p>
      <ul>
        {routine.activities.map((activity) => {
          return <ActivityForRoutine key={activity.id} activity={activity} />;
        })}
      </ul>
      {userCtx.user.userId === routine.creatorId ? (
        <>
          <button>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </>
      ) : null}
    </div>
  );
};

export default Routine;
