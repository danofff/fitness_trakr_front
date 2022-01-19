import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { UserContext } from "./store/userContext";
import LoginRegister from "./pages/LoginRegister";
import Routines from "./pages/Routines";
import Activities from "./pages/Activities";
import Container from "./components/ui/Container";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";

import "./App.css";
import MyRoutines from "./pages/MyRoutines";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/routines" element={<Routines />} />
          {user && <Route path="/myroutines" element={<MyRoutines />} />}
          <Route path="/users/:username/routines" element={<Routines />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/auth" element={<LoginRegister />} />
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
