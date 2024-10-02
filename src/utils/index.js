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

export const formatDuration = (duration) => {
  if (!duration) return "No duration specified";

  const timePart = duration.split(" ")[1];

  const [hours, minutes, seconds] = timePart.split(":");

  return `${parseInt(hours)} hours, ${parseInt(minutes)} minutes`;
};

export const getTypeColor = (type) => {
  switch (type) {
    case "offline":
      return "bg-blue-100 text-blue-800";
    case "online":
      return "bg-green-100 text-green-800";
    case "hybrid":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
