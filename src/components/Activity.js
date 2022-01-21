import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { editActivityAct } from "../store/dataActions";
import FormControl from "./ui/FormControl";

import classes from "./Activity.module.css";

const Activity = ({ activity }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [nameInput, setNameInput] = useState(activity.name);
  const [descriptionInput, setDescriptionInput] = useState(
    activity.description
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const onClickEditHandler = (event) => {
    setIsEditMode((prevState) => {
      return !prevState;
    });
  };

  const onEditAccept = (event) => {
    event.preventDefault();
    dispatch(
      editActivityAct(user.token, activity.id, nameInput, descriptionInput)
    );
    setIsEditMode(false);
  };

  return (
    <>
      <form className={classes.activity} onSubmit={onEditAccept}>
        {isEditMode ? (
          <FormControl
            type="text"
            label="Name"
            value={nameInput}
            onInputChange={(e) => setNameInput(e.target.value)}
          />
        ) : (
          <Link to={`/activities/${activity.id}/routines`}>
            <h2>{activity.name}</h2>
          </Link>
        )}
        {isEditMode ? (
          <textarea
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          ></textarea>
        ) : (
          <p>{activity.description}</p>
        )}

        {user && (
          <button onClick={onClickEditHandler} type="button">
            {isEditMode ? "X" : "Edit"}
          </button>
        )}
        {isEditMode && <button>&#10004;</button>}
      </form>
    </>
  );
};

export default Activity;
