import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deleteRoutineAct } from "../store/dataActions";
import RoutineActivity from "./RoutineActivity";
import EditRoutineForm from "./EditRoutineForm";
import AddRoutineActivity from "./ui/AddRoutineActivity";

import Modal from "./ui/Modal";
import { uiActions } from "../store/uiSlice";

import classes from "./Routine.module.css";

const Routine = ({ routine }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isAddActivity, setIsAddActivity] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const addActivityHandler = (event) => {
    setIsAddActivity(true);
  };

  const onDeleteClickHandler = (event) => {
    setIsModalOpen(true);
  };

  const deleteHandler = (event) => {
    dispatch(deleteRoutineAct(user.token, routine.id));
    dispatch(uiActions.setIsModalOpen(false));
  };

  const cancelHandler = (event) => {
    setIsModalOpen(false);
  };

  const editHandler = (event) => {
    setIsEdited(true);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          onAcceptClickHandler={deleteHandler}
          onCancelClickHandler={cancelHandler}
          title="Delete Routine?"
          content={`Are you sure you want to delete ${routine.name}?`}
          acceptText="Delete"
        />
      )}
      <div className={classes.routine}>
        <div className={classes.routineTop}>
          <h2>{routine.name}</h2>
          <Link to={`/users/${routine.creatorName}/routines`}>
            {routine.creatorName}
          </Link>
        </div>
        <p className={classes.isPublic}>
          {user &&
            user.userId === routine.creatorId &&
            (routine.isPublic ? "Public" : "Private")}
        </p>
        <p>
          <span className={classes.goal}>Goal: </span>
          {routine.goal}
        </p>

        <ul>
          {routine.activities.map((activity) => {
            return (
              <RoutineActivity
                key={activity.id}
                activity={activity}
                routineId={routine.id}
                creatorId={routine.creatorId}
              />
            );
          })}
        </ul>

        {user && user.userId === routine.creatorId ? (
          <>
            <button onClick={addActivityHandler}>Add Activity</button>
            <button onClick={editHandler}>Edit</button>
            <button onClick={onDeleteClickHandler}>Delete</button>
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
