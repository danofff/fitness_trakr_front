import { useContext, useEffect } from "react";

import { DataContext } from "../store/dataContext";
import { fetchPublicRoutines } from "../utils/apiCalls";
import Routine from "../components/Routine";

import classes from "./Routines.module.css";

const Routines = (props) => {
  const dataCtx = useContext(DataContext);
  useEffect(() => {
    async function fetchRoutines() {
      try {
        const routines = await fetchPublicRoutines();
        dataCtx.setRoutinesHandler(routines);
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
        {dataCtx.routines.map((routine) => {
          return <Routine key={routine.id} routine={routine} />;
        })}
      </ul>
    </section>
  );
};

export default Routines;
