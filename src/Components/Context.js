import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(
    process.env.REACT_APP_ACCESS_TOKEN
  );

  // Function to fetch course data
  const fetchCourseData = async (token) => {
    try {
      const response = await axios.get(
        "https://dev261597.service-now.com/api/now/table/x_quo_coursehub_course",
        {
          params: {
            sysparm_limit: 10,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data.result);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Access token expired. Refreshing...");
      } else {
        console.error("Error fetching the courses:", err);
        setError("Error fetching courses. Please try again.");
      }
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourseData(accessToken);
  }, [accessToken]);

  return (
    <CourseContext.Provider value={{ courses, error, fetchCourseData }}>
      {children}
    </CourseContext.Provider>
  );
};
