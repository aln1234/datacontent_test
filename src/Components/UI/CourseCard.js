import React, { useState, useContext } from "react";
import axios from "axios"; // Add axios import
import { getTypeColor, formatDuration } from "../../utils";
import { toast } from "react-toastify";
import { CourseContext } from "../../Context/CourseContext";
import { CalendarIcon } from "@heroicons/react/24/solid";

const CourseCard = ({ data, hidden }) => {
  const defaultImage = "/images/book_1.jpg";
  const { fetchSubscribeCourseData, accessToken } = useContext(CourseContext);
  const [error, setError] = useState(null);

  //handle the subscribe functionality
  const handleSubscribe = async () => {
    try {
      await axios.post(
        "https://dev261597.service-now.com/api/now/table/x_quo_coursehub_course_subscription",
        {
          course: data.sys_id,
          learner_id: "learner_sysid", // hardcoded learner Id since the login functionality is not mandatory
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      //show toast when the course is subscribe
      toast("Subscribed to the course!");
      fetchSubscribeCourseData(accessToken);
    } catch (error) {
      setError("Error subscribing to the course.");
    }
  };

  // handle Unsubscribe functionality
  const handleUnsubscribe = async () => {
    try {
      await axios.delete(
        `https://dev261597.service-now.com/api/now/table/x_quo_coursehub_course_subscription/${data.course_id}`, // Updated to pass sys_id in the URL
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast("Unsubscribed from the course!");
      fetchSubscribeCourseData(accessToken);
    } catch (error) {
      setError("Error unsubscribing from the course.");
      toast(error);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <img
        src={data.imageUrl || defaultImage}
        alt={data.title}
        className="w-full h-36 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.title}</div>

        <p className="text-gray-700 text-base">{data.description}</p>

        <div className="flex items-center mt-4 ">
          <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />

          <span>{formatDuration(data.duration)}</span>
        </div>

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
            onClick={handleUnsubscribe}
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
