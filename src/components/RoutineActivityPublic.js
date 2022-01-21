import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteRoutineActivityAct,
  editRoutineActivityAct,
} from "../store/dataActions";

import classes from "./RoutineActivity.module.css";

const RoutineActivity = ({ activity, isInForm, routineId, creatorId }) => {
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
    <li className={classes.routineActivity}>
      <Link to={`/activities/${activity.activityId}/routines`}>
        {activity.name}
      </Link>
      {" | "}
      <span>{activity.description} | </span>
      <span>Count: {activity.count}</span>
      <span> {activity.duration}</span>
    </li>
  );
};

export default RoutineActivity;
