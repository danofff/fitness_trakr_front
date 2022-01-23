import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import Container from "./ui/Container";
import { userActions } from "../store/userSlice";

import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const logOutHandler = () => {
    dispatch(userActions.logoutUser());
    navigate("/routines", { replace: true });
  };
  return (
    <header>
      <Container>
        <div className={classes.header}>
          <NavLink to="/routines">
            <h1 className={classes.title}>
              <i class="fas fa-heartbeat"></i> FitnessTrac.kr
            </h1>
          </NavLink>

          <nav className={classes.navigation}>
            <NavLink to="/routines" className={classes.plainLink}>
              Home
            </NavLink>
            <NavLink to="/routines" className={classes.plainLink}>
              Routines
            </NavLink>
            <NavLink to="/activities" className={classes.plainLink}>
              Activities
            </NavLink>
            {user && (
              <NavLink to="/myroutines" className={classes.plainLink}>
                My Routines
              </NavLink>
            )}

            {!user && (
              <NavLink to="/auth">
                <button className={classes.loginButton}>Login/Register</button>
              </NavLink>
            )}
            {user && (
              <button className={classes.logoutButton} onClick={logOutHandler}>
                Logout
              </button>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
