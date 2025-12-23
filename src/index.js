import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongo from "./Config/mongo.js"; 

import authRoutes from "./Routes/authRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectMongo();

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
