import React, { useState, useContext } from "react";
import { UserContext } from "../store/userContext";
import { loginUser, registerUser } from "../utils/apiCalls";

import FormControl from "../components/ui/FormControl";

import classes from "./LoginRegister.module.css";
import StyledCheckbox from "../components/ui/StyledCheckbox";

const LoginRegister = (props) => {
  const userCtx = useContext(UserContext);
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [mode, setMode] = useState("Login");

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
        const userToken = await loginUser({
          username: userNameInput,
          password: passwordInput,
        });
        userCtx.login(userToken);
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
        await registerUser({
          username: userNameInput,
          password: passwordInput,
        });
      } catch (error) {
        //handle unsuccessfull request
        // ...
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
