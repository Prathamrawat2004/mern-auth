import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import cors from "cors"; 
dotenv.config();

const app = express();

// connecting to database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not connected", err);
  });

// middleware
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
