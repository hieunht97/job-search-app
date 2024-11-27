import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import cookieParser from "cookie-parser";
import {
  createRefreshToken,
  createToken,
  validateToken,
} from "../utils/JWT.js";

const router = express.Router();
const saltRounds = 14;

router.use(cookieParser());

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      // check for duplicated email addy
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
        return res.status(422).json({ error: "Email already exist" });
      }
      // create new user
      const user = await User.create({
        email,
        password: hash,
      });

      console.log("Created new user:\n", user);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // check for duplicated email addy
    const user = await User.findOne({ email: email });
    if (!user || !user.password) {
      res.status(404).json({ error: "Email not found" });
      return;
    }

    // check for valid password --> if correct allow log in
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(404).json({ error: "Invalid email or password" });
    } else {
      // create access token
      const accessToken = createToken(user);

      // create refresh token
      const refreshToken = createRefreshToken(user);

      // create cookie
      res.cookie("refresh-token", refreshToken, {
        maxAge: 259200000, // cookie valid for 3 days
        httpOnly: true,
        sameSite: "None",
        secure: false,
      });

      console.log("Set-Cookie: refresh-token:", refreshToken);

      res.status(200).json({ message: "Logged in successfully", accessToken });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/logout", (req, res) => {
  res.cookie("refresh-token", "", { maxAge: 1 });
  console.log("logged out successfully");
  res.redirect("/");
});

export default router;
