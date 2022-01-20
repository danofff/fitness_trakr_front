import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import FormControl from "./ui/FormControl";
import StyledCheckbox from "./ui/StyledCheckbox";
import { deleteRoutineActivityAct, editRoutineAct } from "../store/dataActions";
import RoutineActivity from "./RoutineActivity";

import classes from "./EditRoutineForm.module.css";

const EditRoutineForm = ({ routine, onClose }) => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState(routine.name);
  const [goalInput, setGoalInput] = useState(routine.goal);
  const [isPublic, setIsPublic] = useState(routine.isPublic);

  const onNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setGoalInput(event.target.value);
  };

  const onRoutineActivityDelete = (event, activityId) => {
    console.log("delete is working", activityId);
    dispatch(deleteRoutineActivityAct(user.token, activityId, routine.id));
  };

  const onEditSubmit = (event) => {
    event.preventDefault();
    console.log("edit is working");
    dispatch(
      editRoutineAct(user.token, routine.id, nameInput, goalInput, isPublic)
    );
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
        <StyledCheckbox
          checked={isPublic}
          onChangeHandler={() => {
            setIsPublic(!isPublic);
          }}
          label={isPublic ? "Make it Private" : "Make it Public"}
        />
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
        <button onClick={onEditSubmit}>Done</button>
      </form>
    </div>
  );
};

export default EditRoutineForm;
