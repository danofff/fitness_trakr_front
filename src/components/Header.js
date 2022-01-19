import { useContext } from "react";
import { NavLink } from "react-router-dom";

import Container from "./ui/Container";
import { UserContext } from "../store/userContext";

import classes from "./Header.module.css";

const Header = () => {
  const { userToken, logOut } = useContext(UserContext);
  const logOutHandler = () => {
    logOut();
  };
  return (
    <header>
      <Container>
        <nav className={classes.navigation}>
          <NavLink to="/routines">Routines</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          {userToken && <NavLink to="/myroutines">My Routines</NavLink>}
          {!userToken && <NavLink to="/auth">Login/Register</NavLink>}
          {/* CREATE HOME BUTTON */}
          {userToken && <button onClick={logOutHandler}>Logout</button>}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
