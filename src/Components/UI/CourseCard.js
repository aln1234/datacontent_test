import React, { useState } from "react";
import axios from "axios"; // Add axios import
import { getTypeColor, formatDuration } from "../../utils";
import { toast } from "react-toastify";

const CourseCard = ({ data }) => {
  const defaultImage = "https://via.placeholder.com/400x200?text=Course+Image";
  const [error, setError] = useState(null); // Add error state

  const handleSubscribe = async () => {
    try {
      await axios.post(
        "https://dev261597.service-now.com/api/now/table/x_quo_coursehub_course_subscription",
        {
          course: data.sys_id, // Access course ID from the destructured data
          learner_id: "learner_sysid", // Hardcoded learner ID
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`, // Use your access token for authentication
            "Content-Type": "application/json",
          },
        }
      );

      toast("Subscribed to the course!");
    } catch (error) {
      setError("Error subscribing to the course."); // Set error in state
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <img
        src={data.imageUrl || defaultImage} // Use default image if no imageUrl provided
        alt={data.title}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.title}</div>

        <p className="text-gray-700 text-base">{data.description}</p>

        <p className="text-sm text-gray-500 mb-4">
          Duration: {formatDuration(data.duration)}
        </p>

        {/* Display the error message if any */}
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
        <button
          onClick={handleSubscribe}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
