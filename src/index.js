import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import DataContextProvider from "./store/dataContext";
import UserContextProvider from "./store/userContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <DataContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
