import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Navbar from "./Components/Navbar";
import Courses from "./Components/Courses";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubscribeCourse from "./Components/SubscribeCourse";
import { CourseProvider } from "./Components/Context";

const App = () => {
  return (
    <CourseProvider>
      <Router>
        <ToastContainer />
        <Navbar /> {/* Include the navbar */}
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/subscriptions" element={<SubscribeCourse />} />
        </Routes>
      </Router>
    </CourseProvider>
  );
};

export default App;
