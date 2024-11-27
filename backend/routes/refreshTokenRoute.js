import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  const cookies = req.cookies;
  console.log("Request Headers:", req.headers);
  console.log("Request Cookies:", req.cookies);
  console.log("Cookies in /refresh route:", cookies);

  // Check if refresh token is present in cookies
  if (!cookies || !cookies["refresh-token"]) {
    console.error("No refresh token in cookies");
    return res.status(401).json({ error: "Refresh token missing" }); // Correctly send 401 response
  }

  const refreshToken = cookies["refresh-token"];

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("Invalid refresh token:", err.message);
      return res.status(403).json({ error: "Invalid refresh token" }); // Send 403 response for invalid token
    }

    console.log("Decoded refresh token:", decoded);

    // Create a new access token
    const accessToken = jwt.sign(
      { email: decoded.email },
      process.env.JWTSECRETKEY,
      { expiresIn: "30m" }
    );

    // Send the new access token
    return res.status(200).json({ accessToken });
  });
});

export default router;
