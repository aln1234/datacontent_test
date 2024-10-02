import axios from "axios";

export const refreshAccessToken = async (
  refreshToken,
  setAccessToken,
  setError
) => {
  try {
    const response = await axios.post(
      "https://dev261597.service-now.com/oauth_token.do",
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    setAccessToken(response.data.access_token);
    console.log("Access token refreshed successfully");
    return response.data.access_token;
  } catch (err) {
    console.error("Error refreshing access token:", err);
    setError("Error refreshing access token");
    return null;
  }
};

// export const formatDuration = (duration) => {
//   if (!duration) {
//     return "Invalid duration";
//   }

//   // Extract the time portion from the string (e.g., "00:00:00" part from "1970-01-01 00:00:00")
//   const timePart = duration.split(" ")[1];

//   // Split the time part into hours, minutes, and seconds
//   const [hours, minutes, seconds] = timePart.split(":").map(Number);

//   // Return the formatted duration
//   return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
// };

export const getTypeColor = (type) => {
  switch (type) {
    case "offline":
      return "bg-blue-100 text-blue-800"; // Blue for online courses
    case "online":
      return "bg-green-100 text-green-800"; // Green for offline courses
    case "hybrid":
      return "bg-yellow-100 text-yellow-800"; // Yellow for hybrid courses
    default:
      return "bg-gray-100 text-gray-800"; // Default color for other types
  }
};
