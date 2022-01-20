import { Link } from "react-router-dom";

import classes from "./RoutineActivity.module.css";

const RoutineActivity = ({ activity, isInForm, onButtonClick }) => {
  return (
    <li>
      {/* WRAP ACTIVITY NAME WITH A LINK */}
      <Link to={`/activities/${activity.activityId}/routines`}>
        {activity.name}
      </Link>
      {" | "}
      <span>{activity.description} | </span>
      <span>Count: {activity.count} | </span>
      <span>Duration: {activity.duration}</span>
      {isInForm && (
        <button
          type="button"
          onClick={(event) => {
            onButtonClick(event, activity.id);
          }}
        >
          X
        </button>
      )}
    </li>
  );
};

export default RoutineActivity;
