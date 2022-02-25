import Navbar from "./navbar";
import Home from "./home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gelaIt" element={<div>gela it</div>} />
            <Route
              path="*"
              element={
                <div className="error-page">couldn't find this page</div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
