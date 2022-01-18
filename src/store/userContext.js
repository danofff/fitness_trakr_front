import React, { useState } from "react";

const UserContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const loginUser = () => {};

  const logOutUser = () => {};

  return (
    <UserContext.Provider
      value={{
        user,
        login: loginUser,
        logOut: logOutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
