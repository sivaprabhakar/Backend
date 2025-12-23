import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectMongo } from "./src/Config/mongo.js";
import { mysqlDB } from "./src/Config/mysql.js";

const app = express();
app.use(express.json());
app.use(cors());

connectMongo();

const [rows] = await mysqlDB.query("SELECT 1");
console.log("MySQL connected");

const PORT = process.env.PORT || 8001;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
