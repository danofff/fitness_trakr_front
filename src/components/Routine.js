import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deleteRoutineAct } from "../store/dataActions";
import RoutineActivity from "./RoutineActivity";
import EditRoutineForm from "./EditRoutineForm";
import AddRoutineActivity from "./ui/AddRoutineActivity";

import classes from "./Routine.module.css";

const Routine = ({ routine }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isAddActivity, setIsAddActivity] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const addActivityHandler = (event) => {
    setIsAddActivity(true);
  };

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
        <p>
          {user &&
            user.userId === routine.creatorId &&
            (routine.isPublic ? "Public" : "Private")}
        </p>
        <p>{routine.goal}</p>
        {/* WRAP USERNAME TO LINK */}
        <Link to={`/users/${routine.creatorName}/routines`}>
          {routine.creatorName}
        </Link>
        <ul>
          {routine.activities.map((activity) => {
            return (
              <RoutineActivity
                key={activity.id}
                activity={activity}
                routineId={routine.id}
              />
            );
          })}
        </ul>

        {user && user.userId === routine.creatorId ? (
          <>
            <button onClick={addActivityHandler}>Add Activity</button>
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </>
        ) : null}
      </div>
      {isAddActivity && (
        <AddRoutineActivity
          routineId={routine.id}
          closeFormHandler={setIsAddActivity}
        />
      )}
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
