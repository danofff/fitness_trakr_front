import classes from "./ActivityForRoutine.module.css";

const ActivityForRoutine = ({ activity }) => {
  return (
    <li>
      {/* WRAP ACTIVITY NAME WITH A LINK */}
      <span>{activity.name} | </span>
      <span>{activity.description} | </span>
      <span>Count: {activity.count} | </span>
      <span>Duration: {activity.duration}</span>
    </li>
  );
};

export default ActivityForRoutine;
