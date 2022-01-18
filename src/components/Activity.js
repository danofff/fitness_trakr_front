import classes from "./Activity.module.css";

const Activity = ({ activity }) => {
  return (
    <div className={classes.activity}>
      {/* WRAP WITH A LINK ACTIVITY NAME */}
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
    </div>
  );
};

export default Activity;
