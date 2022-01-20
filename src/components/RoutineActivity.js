import classes from "./RoutineActivity.module.css";

const RoutineActivity = ({ activity, isInForm, onButtonClick }) => {
  return (
    <li>
      {/* WRAP ACTIVITY NAME WITH A LINK */}
      <span>{activity.name} | </span>
      <span>{activity.description} | </span>
      <span>Count: {activity.count} | </span>
      <span>Duration: {activity.duration}</span>
      {isInForm && (
        <button type="button" onClick={onButtonClick}>
          X
        </button>
      )}
    </li>
  );
};

export default RoutineActivity;
