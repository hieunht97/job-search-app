import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";

dotenv.config();

const secretKey = process.env.JWTSECRETKEY;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

if (!secretKey || !refreshSecretKey) {
  throw new Error("secretKey/refreshSecretKey does not exist");
}

// create access token
export const createToken = (user) => {
  const accessToken = jwt.sign(
    { email: user.email, username: user.username },
    secretKey,
    { expiresIn: "15m" }
  );
  return accessToken;
};

// create refresh token
export const createRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { email: user.email, username: user.username },
    refreshSecretKey,
    { expiresIn: "1d" }
  );
  return refreshToken;
};

// unused function
export const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  console.log("Access token received: ", accessToken);

  if (!accessToken) {
    console.log("Access token not received");
    return res.status(400).json({ error: "User not authenticated" });
  } else {
    console.log("Access token received: ", accessToken);
  }

  try {
    const validToken = jwt.verify(accessToken, secretKey);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    console.error("Token validation error: ", err);
    return res.status(400).json({ error: err });
  }
};
