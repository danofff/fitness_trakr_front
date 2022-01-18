import { useContext, useEffect } from "react";
import Activity from "../components/Activity";
import { DataContext } from "../store/dataContext";
import { fetchActivities } from "../utils/apiCalls";

import classes from "./Activities.module.css";

const Activities = (props) => {
  const dataCtx = useContext(DataContext);
  useEffect(() => {
    async function getActivities() {
      try {
        const activities = await fetchActivities();
        dataCtx.setActivitiesHandler(activities);
      } catch (error) {
        //handle error with snackbar
      }
    }
    getActivities();
  }, []);
  return (
    <section className={classes.activities}>
      <h1>Activities</h1>
      <ul>
        {dataCtx.activities.map((activity) => {
          return <Activity key={activity.id} activity={activity} />;
        })}
      </ul>
    </section>
  );
};

export default Activities;
