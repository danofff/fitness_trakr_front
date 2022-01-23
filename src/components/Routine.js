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
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const addActivityHandler = (event) => {
    setIsAddActivity(true);
    setIsAddFormOpen(true);
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
    <section className={classes.routine}>
      {/* Delete-confirm Modal */}
      {isModalOpen && (
        <Modal
          onAcceptClickHandler={deleteHandler}
          onCancelClickHandler={cancelHandler}
          title="Delete Routine?"
          content={`Are you sure you want to delete ${routine.name}?`}
          acceptText="Delete"
        />
      )}

      {/* Single Routine */}

      <div className={classes.inner}>
        <div className={classes.routineTop}>
          <div className={classes.routineTopLeft}>
            <h2>{routine.name}</h2>
            <p className={classes.goal}>
              <span className={classes.goalLabel}>Goal: </span>
              {routine.goal}
            </p>
            <p className={classes.isPublic}>
              {user &&
                user.userId === routine.creatorId &&
                (routine.isPublic ? "Public" : "Private")}
            </p>
          </div>

          <div className={classes.editFormBox}>
            {!isEdited && (
              <button
                className={classes.editRoutineButton}
                onClick={editHandler}
              >
                <i class="fas fa-edit"></i>
              </button>
            )}
            {/* edit routine activity form */}
            {isEdited && (
              <EditRoutineForm
                routine={routine}
                onClose={() => {
                  setIsEdited(false);
                }}
              />
            )}
          </div>
        </div>

        <table>
          {/* label row */}
          <tr className={classes.labelTR}>
            <td className={classes.deleteTD}></td>
            <td className={classes.nameTD}>Activity</td>
            <td className={classes.descriptionTD}>Description</td>
            <td className={classes.countTD}>Count</td>
            <td className={classes.durationTD}>Duration</td>
            <td className={classes.editButtonsTD}></td>
          </tr>

          {/* routine activities rows */}
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
        </table>

        {/* add activity row */}
        <div>
          {isAddActivity ? (
            <button
              className={classes.cancelAddActivityButton}
              type="button"
              onClick={(e) => setIsAddActivity(false)}
            >
              Close Form
            </button>
          ) : (
            <button
              className={classes.addActivityButton}
              onClick={addActivityHandler}
            >
              <i class="fas fa-plus-circle"></i> Add Activity
            </button>
          )}
        </div>

        {/* add routine activity form */}
        {isAddActivity && (
          <AddRoutineActivity
            routineId={routine.id}
            closeFormHandler={setIsAddActivity}
          />
        )}

        {/* delete routine button */}
        <div className={classes.deleteButtonBox}>
          <button
            className={classes.deleteButton}
            onClick={onDeleteClickHandler}
          >
            Delete Routine
          </button>
        </div>
      </div>
    </section>
  );
};

export default Routine;
