import express from "express";
import { createToken, validateToken } from "../utils/JWT.js";
import User from "../models/userSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("---\n", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { email, username, password, company, linkedin, github, doc } =
    req.body;
  try {
    const user = await User.create({
      email,
      username,
      password,
      company,
      linkedin,
      github,
      doc,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
