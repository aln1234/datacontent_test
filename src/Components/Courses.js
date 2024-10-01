import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]); // Update this to store an array of courses
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(
    "cUK2gmIl0P7MaMIrK1RJ4CUJrY24TvgyVRM1HK9RANoodzt1JvotSqeBy0iam_v2p3_8gtm3YtNNMQNsH9h_UA"
  ); // Your initial access token
  const [refreshToken, setRefreshToken] = useState(
    "T0CWqZ_KZLybciTmf-FuiCWWQJlT5a-ZXNsPKBO8jf-Wtzx7INXwhLOIAnk3GpBt5yL-Hbr0KxIlMboT7njOUQ"
  ); // Your initial refresh token
  const [expiresIn, setExpiresIn] = useState(1799); // Time in seconds until the token expires

  // Function to refresh access token
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://dev261597.service-now.com/oauth_token.do",
        new URLSearchParams({
          grant_type: "refresh_token",
          client_id: "your-client-id", // Replace with your actual client ID
          client_secret: "your-client-secret", // Replace with your actual client secret
          refresh_token: refreshToken,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Update the access token and refresh token
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      setExpiresIn(response.data.expires_in); // Update expires_in with the new token's expiry time
      console.log("Access token refreshed successfully");
    } catch (err) {
      console.error("Error refreshing access token:", err);
    }
  };

  // Function to fetch course data
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(
        "https://dev261597.service-now.com/api/now/table/x_quo_coursehub_course",
        {
          params: {
            sysparm_limit: 10, // This ensures that we get 10 records
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Use the current access token
          },
        }
      );

      // Setting the response data to the courses state
      setCourses(response.data.result); // Assuming the response has a 'result' array with multiple courses
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Access token expired. Refreshing...");
        await refreshAccessToken(); // Refresh token and then retry fetching data
        fetchCourseData(); // Retry after refreshing the token
      } else {
        console.error("There was an error fetching the course data!", err);
        setError(err);
      }
    }
  };

  // Timer to refresh the token automatically before it expires
  useEffect(() => {
    // Set up a timer to refresh the token just before it expires
    const tokenRefreshTime = (expiresIn - 10) * 1000; // Refresh 10 seconds before the token expires
    const tokenRefreshInterval = setTimeout(() => {
      refreshAccessToken(); // Refresh the token before it expires
    }, tokenRefreshTime);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(tokenRefreshInterval);
  }, [expiresIn, refreshToken]); // Re-run the timer whenever `expiresIn` or `refreshToken` changes

  useEffect(() => {
    // Call the function to fetch course data when the component mounts
    fetchCourseData();
  }, [accessToken]); // Re-fetch data when the access token is updated

  return (
    <div>
      <h1>Course Data</h1>
      {error && <p>Error: {error.message}</p>}
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
