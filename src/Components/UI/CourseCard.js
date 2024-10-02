import React from "react";
import { getTypeColor } from "../../utils";

const CourseCard = (data) => {
  const defaultImage = "https://via.placeholder.com/400x200?text=Course+Image";
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200  bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <img
        src={data.imageUrl || defaultImage} // Use default image if no imageUrl provided
        alt={data.title}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.data.title}</div>

        <p className="text-gray-700 text-base">{data.data.description}</p>
      </div>

      <div className="px-6 pb-4 flex justify-between">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 bg-opacity-90  ${getTypeColor(
            data.data.type
          )}`}
        >
          {data.data.type}
        </span>
        <button
          //   onClick={onSubscribe}
          duration-200
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
