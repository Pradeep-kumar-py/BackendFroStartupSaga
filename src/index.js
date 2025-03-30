import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./lib/dbconnect.js";
import userRoute from "./routes/user.route.js";
import upload from "./Middleware/upload.js";
import uploadRoute from "./routes/upload.route.js";

dotenv.config({
    path: './.env'
})

const app = express();
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/user", userRoute)

app.use("/api/v1", uploadRoute)
// app.use("/uploads", express.static("uploads"));
// app.use("/images", express.static("images"));


app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
  
    res.json({ url: req.file.path, public_id: req.file.filename });
});




connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})