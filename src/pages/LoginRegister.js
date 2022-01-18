import { useState, useContext } from "react";
import { UserContext } from "../store/userContext";
import { loginUser, registerUser } from "../utils/apiCalls";

import classes from "./LoginRegister.module.css";

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
      } catch (error) {}
    } else {
      //call register api
      try {
        await registerUser({
          username: userNameInput,
          password: passwordInput,
        });
      } catch (error) {
        //handle unsuccessfull request
        // ....
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={onFormSubmit}>
      <div className={classes.form_control}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={userNameInput}
          onChange={onUserNameInputChange}
        />
      </div>
      <div className={classes.form_control}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="passwrod"
          value={passwordInput}
          onChange={onPasswordInputChange}
        />
      </div>
      <input type="checkbox" onChange={onSwitchChange} />
      <label>Switch to {mode === "Login" ? "Sign Up" : "Login"}</label>
      <button type="submit">{mode}</button>
    </form>
  );
};

export default LoginRegister;
