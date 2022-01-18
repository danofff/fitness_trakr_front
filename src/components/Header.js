import { useContext } from "react";
import { NavLink } from "react-router-dom";

import Container from "./ui/Container";
import { UserContext } from "../store/userContext";

import classes from "./Header.module.css";

const Header = () => {
  const userCtx = useContext(UserContext);
  const logOutHandler = () => {
    userCtx.logOut();
  };
  return (
    <header>
      <Container>
        <nav>
          <NavLink to="/routines">Routines</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          {!userCtx.userToken && <NavLink to="/auth">Login/Register</NavLink>}
          {/* CREATE HOME BUTTON */}
          {userCtx.userToken && <button onClick={logOutHandler}>Logout</button>}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
