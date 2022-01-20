import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginUserAct, registerUserAct } from "../store/userActions";
import FormControl from "../components/ui/FormControl";
import StyledCheckbox from "../components/ui/StyledCheckbox";

import classes from "./LoginRegister.module.css";

const LoginRegister = (props) => {
  const dispatch = useDispatch();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [mode, setMode] = useState("Login");

  const navigate = useNavigate();

  const onUserNameInputChange = (event) => {
    setUserNameInput(event.target.value);
  };

  const onPasswordInputChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const onSwitchChange = (event) => {
    if (mode === "Login") {
      setMode("Sign Up");
    } else {
      setMode("Login");
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (mode === "Login") {
      //call login api
      try {
        const isSuccess = await dispatch(
          loginUserAct(userNameInput, passwordInput)
        );
        console.log("success");
        if (isSuccess) {
          navigate("/myroutines");
        }
      } catch (error) {
        //handle unsuccessfull request
        //...
        console.log(error.message);
        setUserNameInput("");
        setPasswordInput("");
      }
    } else {
      //call register api
      try {
        const isSuccess = await dispatch(
          registerUserAct(userNameInput, passwordInput)
        );
        console.log("success");
      } catch (error) {
        //handle unsuccessfull request
        //...
        console.log(error.message);
        setUserNameInput("");
        setPasswordInput("");
      }
    }
  };

  return (
    <React.Fragment>
      <h1>{mode === "Login" ? "Login" : "Sign up"}</h1>
      <form className={classes.form} onSubmit={onFormSubmit}>
        <FormControl
          type="text"
          value={userNameInput}
          onInputChange={onUserNameInputChange}
          label="Username"
        />
        <FormControl
          type="password"
          value={passwordInput}
          onInputChange={onPasswordInputChange}
          label="Password"
        />
        <StyledCheckbox
          onChangeHandler={onSwitchChange}
          label={`Switch to ${mode === "Login" ? "Sign Up" : "Login"}`}
        />
        <button type="submit">{mode}</button>
      </form>
    </React.Fragment>
  );
};

export default LoginRegister;
