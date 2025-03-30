import express from "express";
import upload from "../Middleware/upload.js";
import { uploadFile } from "../controllers/upload.controller.js"; 

const router = express.Router();

router.route("/upload").post(upload.single("file"), uploadFile);

export default router;
