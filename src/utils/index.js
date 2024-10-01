// src/utils/auth.js

import axios from "axios";

// Function to refresh the access token using the refresh token
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
        client_id: process.env.REACT_APP_CLIENT_ID, // Client ID from .env
        client_secret: process.env.REACT_APP_CLIENT_SECRET, // Client Secret from .env
        refresh_token: refreshToken, // Refresh token passed as a parameter
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Update the access token in state
    setAccessToken(response.data.access_token);
    console.log("Access token refreshed successfully");
    return response.data.access_token;
  } catch (err) {
    console.error("Error refreshing access token:", err);
    setError("Error refreshing access token");
    return null;
  }
};
