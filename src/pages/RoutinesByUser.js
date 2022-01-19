import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { DataContext } from "../store/dataContext";
import { fetchRoutinesByUsername } from "../utils/apiCalls";
import Routine from "../components/Routine";

import classes from "./Routines.module.css";

const RoutinesByUser = (props) => {
  const { username } = useParams();
  const { setRoutinesHandler, routines } = useContext(DataContext);

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const routines = await fetchRoutinesByUsername(username);
        setRoutinesHandler(routines);
      } catch (error) {
        console.log(error);
        //handle snackbar
      }
    }
    fetchRoutines();
  }, []);
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

export default RoutinesByUser;
