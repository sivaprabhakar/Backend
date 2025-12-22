import express from "express";
import { getProfile, updateProfile,getUserInfo } from "../Controller/profile.js";
import { verifyToken } from "../Middleware/authmiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.get("/user", verifyToken, getUserInfo);
router.post("/", verifyToken, updateProfile);

export default router;
