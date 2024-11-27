import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import User from "./routes/userRoutes.js";
import Auth from "./routes/authRoutes.js";
import RefreshToken from "./routes/refreshTokenRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // Allow cookies
  })
);

// Routes
app.use("/user", User);
app.use("/auth", Auth);
app.use("/refresh", RefreshToken);

// Test Routes
app.post("/set-cookie", (req, res) => {
  res.cookie("test-cookie", "test-value", {
    maxAge: 3600000, // 1 hour
    httpOnly: true,
    sameSite: "None",
    secure: false,
  });
  res.send("Cookie set");
});

app.get("/read-cookie", (req, res) => {
  console.log("Cookies received:", req.cookies);
  res.json(req.cookies);
});

// Base Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Handle invalid URLs
app.all("*", (_req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
};

startServer();
