import React, { useEffect, useState } from "react";
import axios from "axios";
import { refreshAccessToken } from "../utils";
import CourseCard from "./UI/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(
    process.env.REACT_APP_ACCESS_TOKEN
  );
  const [refreshToken] = useState(process.env.REACT_APP_REFRESH_TOKEN);

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
        const newToken = await refreshAccessToken(
          refreshToken,
          setAccessToken,
          setError
        );
        if (newToken) {
          fetchCourseData(newToken);
        }
      } else {
        console.error("Error fetching the courses:", err);
        setError("Error fetching courses");
      }
    }
  };

  useEffect(() => {
    fetchCourseData(accessToken);
  }, [accessToken]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Course List</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Render the list of courses in a responsive grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard data={course} key={index} />
          ))}
        </div>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default Courses;
