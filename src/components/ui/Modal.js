import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const Modal = ({
  title = "Some Cool Title For Modal",
  content = "Some Cool Content For Modal",
  onAcceptClickHandler,
  acceptText = "Delete",
}) => {
  return createPortal(
    <div>
      <div className={classes.backdrop}></div>
      <div className={classes.window}>
        <h3>{title}</h3>
        <p>{content}</p>
        <div className={classes.actions}>
          <button>Cancel</button>
          <button>{acceptText}</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
