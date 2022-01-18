import React, { useState, useEffect } from "react";

export const UserContext = React.createContext({
  userToken: null,
  login: () => {},
  logout: () => {},
});

const UserContextProvider = (props) => {
  const [userToken, setUserToken] = useState(null);

  const loginUser = (user) => {
    localStorage.setItem("userToken", user.token);
    setUserToken(user);
  };

  const logOutUser = () => {
    setUserToken(null);
    localStorage.removeItem("userToken");
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setUserToken(userToken);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userToken,
        login: loginUser,
        logOut: logOutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
