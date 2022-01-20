import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addRoutineActivityAct } from "../../store/dataActions";

import classes from "./AddRoutineActivity.module.css";

const AddRoutineActivity = ({ routineId, closeFormHandler }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const activities = useSelector((state) => state.data.activities);
  const [selectInput, setSelectInput] = useState(
    activities.length && activities[0].id
  );
  const [countInput, setCountInput] = useState(0);
  const [durationInput, setDurationInput] = useState(0);

  const onAddActivitySubmit = (event) => {
    event.preventDefault();
    dispatch(
      addRoutineActivityAct(
        user.token,
        routineId,
        selectInput,
        countInput,
        durationInput
      )
    );
  };

  return (
    <form onSubmit={onAddActivitySubmit}>
      <button type="button" onClick={() => closeFormHandler(false)}>
        X
      </button>
      <select
        onChange={(e) => {
          setSelectInput(e.target.value);
          console.log(e.target.value);
        }}
        value={selectInput}
      >
        {activities.map((activity) => {
          return (
            <option value={activity.id} key={activity.id}>
              {activity.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="count">Count</label>
      <input
        type="number"
        name="count"
        value={countInput}
        onChange={(e) => {
          setCountInput(e.target.value);
        }}
      />
      <label htmlFor="duration">Duration</label>
      <input
        type="number"
        name="duration"
        value={durationInput}
        onChange={(e) => setDurationInput(e.target.value)}
      />
      <button>Add activity</button>
    </form>
  );
};

export default AddRoutineActivity;
