import React, { useState, useContext } from "react";
import axios from "axios"; // Add axios import
import { getTypeColor, formatDuration } from "../../utils";
import { toast } from "react-toastify";
import { CourseContext } from "../Context/CourseContext";

const CourseCard = ({ data, hidden }) => {
  const defaultImage = "https://via.placeholder.com/400x200?text=Course+Image";
  const { fetchSubscribeCourseData, accessToken, subCourses, setSubCourses } =
    useContext(CourseContext);
  const [error, setError] = useState(null); // Add error state

  const handleSubscribe = async () => {
    try {
      await axios.post(
        "https://dev261597.service-now.com/api/now/table/x_quo_coursehub_course_subscription",
        {
          course: data.sys_id,
          learner_id: "learner_sysid",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast("Subscribed to the course!");
      fetchSubscribeCourseData(accessToken);
    } catch (error) {
      setError("Error subscribing to the course.");
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await axios.post(
        "https://dev261597.service-now.com/api/now/table/x_quo_coursehub_course_subscription",
        {
          sys_id: data.sys_id,
          sysparm_query_no_domain: true,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast("Subscribed to the course!");
      fetchSubscribeCourseData(accessToken);
    } catch (error) {
      setError("Error subscribing to the course.");
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <img
        src={data.imageUrl || defaultImage}
        alt={data.title}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.title}</div>

        <p className="text-gray-700 text-base">{data.description}</p>

        <p className="text-sm text-gray-500 mb-4">
          Duration: {formatDuration(data.duration)}
        </p>

        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="px-6 pb-4 flex justify-between">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 bg-opacity-90 ${getTypeColor(
            data.type
          )}`}
        >
          {data.type}
        </span>
        {!hidden ? (
          <button
            onClick={handleSubscribe}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Subscribe
          </button>
        ) : (
          <button
            onClick={handleSubscribe}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Unsubscribe
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
