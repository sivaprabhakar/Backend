import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { mysqlDB } from "./src/Config/mysql.js";
import { connectMongo } from "./src/Config/mongo.js";

import authRoutes from "./src/Routes/authRoutes.js";
import profileRoutes from "./src/Routes/profileRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());

await connectMongo();
await mysqlDB.query("SELECT 1");
console.log("MySQL connected");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
