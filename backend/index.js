import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import songRoutes from "./routes/songroutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

dotenv.config(".env");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/songs", songRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
