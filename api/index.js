import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// connecting to database
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Database");
})
.catch((err)=>{
    console.log("Not connected", err);
});

const app = express();

app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
});

