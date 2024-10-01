import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Navbar from "./Components/Navbar";
import Courses from "./Components/Courses";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Include the navbar */}
      <Routes>
        <Route path="/" element={<Courses />} />
      </Routes>
    </Router>
  );
};

export default App;
