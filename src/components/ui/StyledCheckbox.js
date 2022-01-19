import "./StyledCheckbox.css";

const StyledCheckbox = ({ onChangeHandler, label }) => {
  return (
    <div className="checkbox__control">
      <input type="checkbox" onChange={onChangeHandler} />
      <label>{label}</label>
    </div>
  );
};

export default StyledCheckbox;
