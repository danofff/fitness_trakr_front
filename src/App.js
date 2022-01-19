import { Routes, Route } from "react-router-dom";

import LoginRegister from "./pages/LoginRegister";
import Routines from "./pages/Routines";
import Activities from "./pages/Activities";
import Container from "./components/ui/Container";
import Header from "./components/Header";

import "./App.css";
import MyRoutines from "./pages/MyRoutines";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/routines" element={<Routines />} />
          <Route path="/myroutines" element={<MyRoutines />} />
          <Route path="/users/:username/routines" element={<Routines />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/auth" element={<LoginRegister />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
