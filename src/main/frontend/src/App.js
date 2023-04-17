import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn"
import Menu from "./pages/Menu"
import Estimate from "./pages/Estimate"

import ButtonAppBar from "./pages/ButtonAppBar";
import ChipSample from "./pages/ChipSample";
import AccordionSample from "./pages/AccordionSample";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/bar" element={<ButtonAppBar />} />
          <Route path="/chip" element={<ChipSample />} />
          <Route path="/accordion" element={<AccordionSample />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
