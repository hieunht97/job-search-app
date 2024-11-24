import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
// import { UserType } from "../models/userSchema.js";
// import { Request, Response, NextFunction } from "express";

dotenv.config();
const secretKey = process.env.JWTSECRETKEY;

if (!secretKey) {
  throw new Error("secretKey does not exist");
}
// create token
export const createToken = (user) => {
  const accessToken = jwt.sign(
    { email: user.email, username: user.username },
    secretKey,
    { expiresIn: "15m" }
  );
  return accessToken;
};

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
// export default createToken;
// export default validateToken;
