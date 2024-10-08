import React, { useContext } from "react";
import { CourseContext } from "../Context/CourseContext";

import CourseCard from "./UI/CourseCard";

const SubscribeCourse = () => {
  const { courses, subCourses, error } = useContext(CourseContext);

  const mergedArray = courses
    .filter((course) =>
      subCourses.some((sub) => sub.course.value === course.sys_id)
    )
    .map((course) => {
      const matchedSubCourse = subCourses.find(
        (sub) => sub.course.value === course.sys_id
      );

      return {
        ...course,
        learnerId: matchedSubCourse.learner.value,
        course_id: matchedSubCourse.sys_id,
      };
    });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Enrolled Courses</h1>

      {error && <p className="text-red-500">{error}</p>}

      {mergedArray.length > 0 ? (
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
