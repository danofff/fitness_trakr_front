import { Link } from "react-router-dom";
import RoutineActivityPublic from "./RoutineActivityPublic";

import classes from "./Routine.module.css";

const Routine = ({ routine }) => {
  return (
    <div className={classes.routine}>
      <div className={classes.routineTop}>
        <h2>{routine.name}</h2>
        <Link to={`/users/${routine.creatorName}/routines`}>
          {routine.creatorName}
        </Link>
      </div>
      <p>
        <span className={classes.goal}>Goal: </span>
        {routine.goal}
      </p>

      <ul>
        {routine.activities.map((activity) => {
          return (
            <RoutineActivityPublic
              key={activity.id}
              activity={activity}
              routineId={routine.id}
              creatorId={routine.creatorId}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Routine;
