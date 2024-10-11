import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
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


// Routes
app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
