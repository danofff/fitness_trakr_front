import { useContext, useEffect } from "react";

import { fetchMyRoutines } from "../utils/apiCalls";
import { DataContext } from "../store/dataContext";
import { UserContext } from "../store/userContext";
import Routine from "../components/Routine";

import classes from "./Routines.module.css";

const MyRoutines = (props) => {
  const { setRoutinesHandler, routines } = useContext(DataContext);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const routines = await fetchMyRoutines(userToken);
        setRoutinesHandler(routines);
      } catch (error) {
        console.log(error);
        //handle snackbar
      }
    }
    if (userToken) {
      fetchRoutines();
    }
  }, [userToken]);
  return (
    <section className={classes.routinespage}>
      <h1>Routines</h1>
      <ul>
        {routines.map((routine) => {
          return <Routine key={routine.id} routine={routine} />;
        })}
      </ul>
    </section>
  );
};

export default MyRoutines;
