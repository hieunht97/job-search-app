import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
    secretKey
  );
  return accessToken;
};

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).json({ error: "User not authenticated" });
  }

  try {
    const validToken = jwt.verify(accessToken, secretKey);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
// export default createToken;
// export default validateToken;
