import classes from "./Routine.module.css";

import ActivityForRoutine from "./ActivityForRoutine";

const Routine = ({ routine }) => {
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
    </div>
  );
};

export default Routine;
