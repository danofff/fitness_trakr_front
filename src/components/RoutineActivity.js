import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteRoutineActivityAct,
  editRoutineActivityAct,
} from "../store/dataActions";

import classes from "./RoutineActivity.module.css";

const RoutineActivity = ({ activity, isInForm, routineId }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [countInput, setCountInput] = useState(activity.count);
  const [durationInput, setDurationInput] = useState(activity.duration);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const onRoutineActivityDelete = (event, activityId) => {
    dispatch(deleteRoutineActivityAct(user.token, activityId, routineId));
  };

  const onRoutineActivityEdit = () => {
    //dispatch action
    dispatch(
      editRoutineActivityAct(user.token, activity.id, countInput, durationInput)
    );
    setIsEdited(false);
  };
  return (
    <li>
      <button
        type="button"
        onClick={(event) => {
          onRoutineActivityDelete(event, activity.id);
        }}
      >
        X
      </button>
      <Link to={`/activities/${activity.activityId}/routines`}>
        {activity.name}
      </Link>
      {" | "}
      <span>{activity.description} | </span>
      <span>
        Count:{" "}
        {isEdited ? (
          <input
            type="number"
            onChange={(e) => setCountInput(e.target.value)}
            value={countInput}
          />
        ) : (
          activity.count
        )}{" "}
        |{" "}
      </span>

      <span>
        Duration:{" "}
        {isEdited ? (
          <input
            type="number"
            onChange={(e) => setDurationInput(e.target.value)}
            value={durationInput}
          />
        ) : (
          activity.duration
        )}
      </span>

      {!isEdited && (
        <button type="button" onClick={(e) => setIsEdited(!isEdited)}>
          &#9998;
        </button>
      )}
      {isEdited && (
        <button type="button" onClick={onRoutineActivityEdit}>
          &#10004;
        </button>
      )}
    </li>
  );
};

export default RoutineActivity;
