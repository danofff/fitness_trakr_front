import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormControl from "../components/ui/FormControl";
import Activity from "../components/Activity";
import { createActivityAct, getActivitiesAct } from "../store/dataActions";

import classes from "./Activities.module.css";

const Activities = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const activities = useSelector((state) => state.data.activities);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    dispatch(getActivitiesAct());
  }, [dispatch]);

  const openFormToggle = (event) => {
    if (isFormOpen === true) {
      setIsFormOpen(false);
      setNameInput("");
      setDescriptionInput("");
    }

    if (isFormOpen === false) {
      setIsFormOpen(true);
    }
  };

  const onNameInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const onDescriptionInputChange = (event) => {
    setDescriptionInput(event.target.value);
  };

  //create activity submition
  const onFormSubmit = async (event) => {
    event.preventDefault();
    dispatch(createActivityAct(user.token, nameInput, descriptionInput));
  };

  return (
    <section className={classes.activities}>
      <h1>Activities</h1>
      {user &&
        (isFormOpen ? (
          <form className={classes.form} onSubmit={onFormSubmit}>
            <button onClick={openFormToggle} type="button">
              X
            </button>
            <h3>Create A New Activity</h3>
            <FormControl
              type="text"
              value={nameInput}
              onInputChange={onNameInputChange}
              label="name"
            />
            <FormControl
              type="text"
              value={descriptionInput}
              onInputChange={onDescriptionInputChange}
              label="description"
            />
            <button type="submit">Create</button>
          </form>
        ) : (
          <button onClick={openFormToggle}>Create new activity</button>
        ))}
      <ul>
        {activities.map((activity) => {
          return <Activity key={activity.id} activity={activity} />;
        })}
      </ul>
    </section>
  );
};

export default Activities;
