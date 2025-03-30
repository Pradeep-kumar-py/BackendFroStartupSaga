import { Router } from "express";
import { PostUserData } from "../controllers/user.controller.js";

PostUserData
const router = Router();

router.route("/").get((req, res) => {
    res.status(200).json({ message: "User route" });
});

router.route("/create").post(PostUserData)
export default router;