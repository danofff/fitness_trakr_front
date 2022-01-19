import { useContext, useEffect, useState } from "react";

import FormControl from "../components/ui/FormControl";

import { fetchMyRoutines, createRoutine } from "../utils/apiCalls";
import { DataContext } from "../store/dataContext";
import { UserContext } from "../store/userContext";
import Routine from "../components/Routine";

import classes from "./Routines.module.css";
import StyledCheckbox from "../components/ui/StyledCheckbox";

const MyRoutines = (props) => {
  const { setRoutinesHandler, routines, addRoutine } = useContext(DataContext);
  const { user } = useContext(UserContext);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const routines = await fetchMyRoutines(user.token);
        setRoutinesHandler(routines);
      } catch (error) {
        console.log(error);
        //handle snackbar
      }
    }
    if (user) {
      fetchRoutines();
    }
  }, [user]);

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

  const onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const newRoutine = await createRoutine(
        user.token,
        isPublic,
        nameInput,
        goalInput
      );
      addRoutine(newRoutine);
    } catch (error) {
      console.log(error.message);
    } finally {
      setNameInput("");
      setGoalInput("");
      setIsPublic(false);
      setIsFormOpen(false);
    }
  };

  return (
    <section className={classes.routinespage}>
      <h1>My Routines</h1>

      {isFormOpen ? (
        <form className={classes.form} onSubmit={onFormSubmit}>
          <button onClick={openFormToggle}>X</button>
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
            label={isPublic ? "Private" : "Public"}
          />
          <button type="submit">Create</button>
        </form>
      ) : (
        <button onClick={openFormToggle}>Create new routine</button>
      )}

      <ul>
        {routines.map((routine) => {
          return <Routine key={routine.id} routine={routine} />;
        })}
      </ul>
    </section>
  );
};

export default MyRoutines;
