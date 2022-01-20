import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteRoutineAct } from "../store/dataActions";
import RoutineActivity from "./RoutineActivity";
import EditRoutineForm from "./EditRoutineForm";

import classes from "./Routine.module.css";

const Routine = ({ routine }) => {
  const [isEdited, setIsEdited] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const deleteHandler = (event) => {
    dispatch(deleteRoutineAct(user.token, routine.id));
  };
  const editHandler = (event) => {
    setIsEdited(true);
  };

  return (
    <>
      <div className={classes.routine}>
        <h2>{routine.name}</h2>
        <p>{routine.goal}</p>
        {/* WRAP USERNAME TO LINK */}
        <p>{routine.creatorName}</p>
        <ul>
          {routine.activities.map((activity) => {
            return <RoutineActivity key={activity.id} activity={activity} />;
          })}
        </ul>
        {user && user.userId === routine.creatorId ? (
          <>
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </>
        ) : null}
      </div>
      {isEdited && (
        <EditRoutineForm
          routine={routine}
          onClose={() => {
            setIsEdited(false);
          }}
        />
      )}
    </>
  );
};

export default Routine;
