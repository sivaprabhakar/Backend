import express from "express";
import { registerUser } from "../Controller/register.js";
import { loginUser } from "../Controller/login.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
