import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import FormControl from "./ui/FormControl";

import classes from "./EditRoutineForm.module.css";
import RoutineActivity from "./RoutineActivity";

const EditRoutineForm = ({ routine, onClose }) => {
  const activities = useSelector((state) => state.data.activities);
  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState(routine.name);
  const [goalInput, setGoalInput] = useState(routine.goal);

  const onNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setGoalInput(event.target.value);
  };

  const onRoutineActivityDelete = (event) => {
    console.log("delete is working");
  };

  return (
    <div>
      <button onClick={onClose}>X</button>
      <form className={classes.container}>
        <FormControl
          type="text"
          value={nameInput}
          onInputChange={onNameChange}
          label="name"
        />
        <FormControl
          type="text"
          value={goalInput}
          onInputChange={onDescriptionChange}
          label="goal"
        />
        <select>
          {activities.map((activity) => {
            return (
              <option value={activity.id} key={activity.id}>
                {activity.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="count">Count</label>
        <input type="number" name="count"></input>
        <label htmlFor="duration">Duration</label>
        <input type="number" name="duration"></input>
        <button type="button">Add activity</button>
        <ul>
          {routine.activities.map((activity) => {
            return (
              <RoutineActivity
                isInForm={true}
                key={activity.id}
                activity={activity}
                onButtonClick={onRoutineActivityDelete}
              />
            );
          })}
        </ul>
      </form>
    </div>
  );
};

export default EditRoutineForm;
