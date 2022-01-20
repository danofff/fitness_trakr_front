import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import Container from "./ui/Container";
import { userActions } from "../store/userSlice";

import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const logOutHandler = () => {
    dispatch(userActions.logoutUser());
  };
  return (
    <header>
      <Container>
        <nav className={classes.navigation}>
          <NavLink to="/routines">Routines</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          {user && <NavLink to="/myroutines">My Routines</NavLink>}
          {!user && <NavLink to="/auth">Login/Register</NavLink>}
          {/* CREATE HOME BUTTON */}
          {user && <button onClick={logOutHandler}>Logout</button>}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
