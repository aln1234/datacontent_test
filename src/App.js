import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar";
import Courses from "./Components/Courses";
import SubscribeCourse from "./Components/SubscribeCourse";
import { CourseProvider } from "./Context/CourseContext";

const App = () => {
  return (
    <CourseProvider>
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/subscriptions" element={<SubscribeCourse />} />
        </Routes>
      </Router>
    </CourseProvider>
  );
};

export default App;
