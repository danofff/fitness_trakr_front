import React, { useState, useEffect } from "react";

export const UserContext = React.createContext({
  userToken: null,
  login: () => {},
  logout: () => {},
});

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const loginUser = (user) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: user.token,
        username: user.username,
        userId: user.userId,
      })
    );
    setUser(user);
  };

  const logOutUser = () => {
    setUser(null);
    localStorage.removeItem("userToken");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setUser(user);
  }, []);

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
