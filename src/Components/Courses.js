import React, { useEffect, useState } from "react";
import axios from "axios";
import { refreshAccessToken } from "../utils";

// Import the function from utils

const Courses = () => {
  const [courses, setCourses] = useState([]); // State to store courses
  const [error, setError] = useState(null); // State to store error
  const [accessToken, setAccessToken] = useState(
    process.env.REACT_APP_ACCESS_TOKEN
  ); // Initial access token from .env
  const [refreshToken] = useState(process.env.REACT_APP_REFRESH_TOKEN); // Refresh token from .env

  // Function to fetch course data
  const fetchCourseData = async (token) => {
    try {
      const response = await axios.get(
        "https://dev261597.service-now.com/api/now/table/x_quo_coursehub_course",
        {
          params: {
            sysparm_limit: 10, // Fetch 10 records
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the provided access token
          },
        }
      );

      // Store the courses in state
      setCourses(response.data.result);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Access token expired. Refreshing...");
        const newToken = await refreshAccessToken(
          refreshToken,
          setAccessToken,
          setError
        );
        if (newToken) {
          fetchCourseData(newToken); // Retry fetching data with new token
        }
      } else {
        console.error("Error fetching the courses:", err);
        setError("Error fetching courses");
      }
    }
  };

  // Fetch course data when the component mounts
  useEffect(() => {
    fetchCourseData(accessToken);
  }, [accessToken]); // Depend on the access token

  return (
    <div>
      <h1>Course Data</h1>

      {error && <p>{error}</p>}

      {/* Render the list of courses */}
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.sys_id}>
              <h2>{course.title}</h2>
              <p>Type: {course.type}</p>
              <p>Duration: {course.duration}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default Courses;
