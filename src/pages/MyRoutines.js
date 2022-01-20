import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormControl from "../components/ui/FormControl";
import Routine from "../components/Routine";
import {
  createRoutineAct,
  getActivitiesAct,
  getMyRoutinesAct,
} from "../store/dataActions";

import classes from "./MyRoutines.module.css";
import StyledCheckbox from "../components/ui/StyledCheckbox";

const MyRoutines = (props) => {
  const user = useSelector((state) => state.user.user);
  const myRoutines = useSelector((state) => state.data.myRoutines);

  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [shouldFetchRoutines, setShouldFetchRoutines] = useState(true);

  //fetch all my routines
  useEffect(() => {
    if (user && shouldFetchRoutines) {
      dispatch(getMyRoutinesAct(user.token));
      setShouldFetchRoutines(false);
    }
    dispatch(getActivitiesAct());
  }, [user, shouldFetchRoutines, dispatch]);

  //open add routine form handler
  const openFormToggle = (event) => {
    if (isFormOpen === true) {
      setIsFormOpen(false);
      setNameInput("");
      setGoalInput("");
    }
    if (isFormOpen === false) {
      setIsFormOpen(true);
    }
  };

  const onNameInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const onGoalInputChange = (event) => {
    setGoalInput(event.target.value);
  };

  const onSwitchChange = (event) => {
    isPublic ? setIsPublic(false) : setIsPublic(true);
  };

  //add new routine form handler
  const onFormSubmit = (event) => {
    event.preventDefault();
    //UI if success clean inputs and close form,
    //if not leave form open clean form or not?
    dispatch(
      createRoutineAct(
        user.token,
        user.username,
        isPublic,
        nameInput,
        goalInput
      )
    );
  };

  return (
    <section className={classes.container}>
      <h1>My Routines</h1>

      <form
        className={`${isFormOpen ? classes.isOpen : classes.form}`}
        onSubmit={onFormSubmit}
      >
        <button onClick={openFormToggle} type="button">
          X
        </button>
        <h3>Create A New Routine</h3>
        <FormControl
          type="text"
          value={nameInput}
          onInputChange={onNameInputChange}
          label="name"
        />
        <FormControl
          type="text"
          value={goalInput}
          onInputChange={onGoalInputChange}
          label="goal"
        />
        <StyledCheckbox
          onChangeHandler={onSwitchChange}
          label={isPublic ? "Make it Private" : "Make it Public"}
        />
        <button type="submit">Create</button>
      </form>
      {!isFormOpen && (
        <button onClick={openFormToggle}>Create new routine</button>
      )}
      <ul>
        {myRoutines.map((routine) => {
          return <Routine key={routine.id} routine={routine} />;
        })}
      </ul>
    </section>
  );
};

export default MyRoutines;
