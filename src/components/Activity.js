import { useDispatch, useSelector } from "react-redux";
import { editActivityAct } from "../store/dataActions";

import classes from "./Activity.module.css";

const Activity = ({ activity }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const onClickEditHandler = (event) => {
    dispatch(editActivityAct());
  };

  return (
    <div className={classes.activity}>
      {/* WRAP WITH A LINK ACTIVITY NAME */}
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
      <button onClick={onClickEditHandler}>Edit</button>
    </div>
  );
};

export default Activity;
