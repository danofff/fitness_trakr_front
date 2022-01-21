import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { uiActions } from "../../store/uiSlice";
import Container from "./Container";

import classes from "./Snackbar.module.css";

const Snackbar = () => {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state) => {
    return state.ui.snackbar;
  });

  useEffect(() => {
    let timeOutId;
    if (snackbarState.isSnackbarOpen) {
      timeOutId = setTimeout(() => {
        console.log("useEffect is working");
        dispatch(
          uiActions.setSnackbar({
            isSnackbarOpen: false,
            text: "some default",
            type: "default",
          })
        );
      }, 5000);
    }

    return () => {
      clearTimeout(timeOutId);
    };
  }, [snackbarState.isSnackbarOpen]);

  const onCloseClickHandler = (e) => {
    dispatch(
      uiActions.setSnackbar({
        isSnackbarOpen: false,
        text: "some default",
        type: "default",
      })
    );
  };

  return (
    <div
      className={`${classes.snackbar} ${
        snackbarState.isSnackbarOpen ? classes.active : null
      } ${classes[snackbarState.type]}`}
    >
      <Container>
        <p>{snackbarState.text}</p>
        <span onClick={onCloseClickHandler}>X</span>
      </Container>
    </div>
  );
};

export default Snackbar;
