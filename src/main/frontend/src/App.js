import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn"
import Menu from "./pages/Menu"
import Estimate from "./pages/Estimate"
import EstimateSearch from "./pages/EstimateSearch";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/estimate_search" element={<EstimateSearch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
