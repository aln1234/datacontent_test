// src/components/Navbar.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { CourseContext } from "./Context/CourseContext";

const Navbar = () => {
  const [courseCount, setCourseCount] = useState(12);
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
      };
    });
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <h1 className="text-xl uppercase">Learnify</h1>
              </Link>
            </div>
            {/* Links */}
            <div className="hidden sm:flex items-center sm:space-x-8 ml-10">
              <Link
                to="/subscriptions"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                My Courses
              </Link>
            </div>
          </div>

          {/* Right-side Actions */}
          <div className="hidden sm:flex sm:items-center">
            {/* Log in / My Account */}
            <Link
              to="/subscriptions"
              className="relative text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              {/* Icon added here */}

              {/* Show course count only when it's greater than 0 */}
              {courseCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {mergedArray.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
