import express from "express";
import authMiddleware from "../Middleware/authmiddleware.js";
import { getProfile, updateProfile } from "../Controller/profile.js";

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);

export default router;
