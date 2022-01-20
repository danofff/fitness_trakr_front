import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Routine from "../components/Routine";
import { getPublicRoutinesAct } from "../store/dataActions";

import classes from "./Routines.module.css";

const Routines = (props) => {
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.data.routines);
  useEffect(() => {
    dispatch(getPublicRoutinesAct());
  }, [dispatch]);
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

export default Routines;
