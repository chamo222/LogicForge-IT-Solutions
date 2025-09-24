import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/users.js";
import { requireAuth } from "@clerk/clerk-sdk-node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ["http://localhost:3001", "https://logicforge-it-solutions.netlify.app/services"],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => res.send("Server is running!"));

// Example User route
app.get("/api/user", requireAuth, (req, res) => {
  res.json({ message: "You are authenticated!", userId: req.auth.userId });
});

// API routes
app.use("/api/users", usersRouter);

// Start server
app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on port ${PORT}`));