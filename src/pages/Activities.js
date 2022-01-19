import { useContext, useEffect, useState } from "react";

import FormControl from "../components/ui/FormControl";

import { fetchActivities, createActivity } from "../utils/apiCalls";
import { DataContext } from "../store/dataContext";
import { UserContext } from "../store/userContext";
import Activity from "../components/Activity";

import classes from "./Activities.module.css";

const Activities = (props) => {
  const { setActivitiesHandler, activities } = useContext(DataContext);
  const { user } = useContext(UserContext);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    async function getActivities() {
      try {
        const activities = await fetchActivities();
        setActivitiesHandler(activities);
      } catch (error) {
        //handle error with snackbar
      }
    }
    getActivities();
  }, [setActivitiesHandler]);

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

  const onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createActivity(user.token, nameInput, descriptionInput);
    } catch (error) {
      console.log(error.message);
    } finally {
      setNameInput("");
      setDescriptionInput("");
      setIsFormOpen(false);
    }
  };

  return (
    <section className={classes.activities}>
      <h1>Activities</h1>

      {isFormOpen ? (
        <form className={classes.form} onSubmit={onFormSubmit}>
          <button onClick={openFormToggle}>X</button>
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
      )}

      <ul>
        {activities.map((activity) => {
          return <Activity key={activity.id} activity={activity} />;
        })}
      </ul>
    </section>
  );
};

export default Activities;
