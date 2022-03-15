import Navbar from "./components/navbar";
import Home from "./pages/home";
import Create from "./pages/create";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogDetails from "./pages/blogDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
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
