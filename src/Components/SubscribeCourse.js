import React, { useContext, useState, useEffect } from "react";

import CourseCard from "./UI/CourseCard";
import axios from "axios";
import { CourseContext } from "./Context";

const SubscribeCourse = () => {
  const { courses } = useContext(CourseContext);
  const [subCourses, setSubCourses] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(
    process.env.REACT_APP_ACCESS_TOKEN
  );

  // Function to fetch course data
  const fetchSubCourseData = async (token) => {
    try {
      const response = await axios.get(
        "https://dev261597.service-now.com/api/now/table/x_quo_coursehub_course_subscription",
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
      setSubCourses(response.data.result);
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
    fetchSubCourseData(accessToken);
  }, [accessToken]);

  // Merging logic
  const mergedArray = courses
    .filter((course) =>
      subCourses.some((sub) => sub.course.value === course.sys_id)
    )
    .map((course) => {
      // Find the corresponding subCourse based on course.sys_id
      const matchedSubCourse = subCourses.find(
        (sub) => sub.course.value === course.sys_id
      );

      // Create the new object combining course data and learner.value
      return {
        ...course, // Spread course data
        learnerId: matchedSubCourse.learner.value, // Add learner.value from subCourses
      };
    });
  console.log(mergedArray);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6"> Subscribe Course List</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Render the list of courses in a responsive grid */}
      {subCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mergedArray.map((course, index) => (
            <CourseCard data={course} hidden={true} key={index} />
          ))}
        </div>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default SubscribeCourse;
