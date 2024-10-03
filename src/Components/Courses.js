import React, { useContext } from "react";

import CourseCard from "./UI/CourseCard";
import { CourseContext } from "./Context/CourseContext";

const Courses = () => {
  const { courses, error } = useContext(CourseContext);

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
