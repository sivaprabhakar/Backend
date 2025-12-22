import bcrypt from "bcrypt";
import { mysqlDB } from "../Config/mysql.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  Check if email already exists (Prepared Statement)
    const checkSql = "SELECT id FROM users WHERE email = ?";
    const [existingUser] = await mysqlDB.execute(checkSql, [email]);

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // 2 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Insert new user (Prepared Statement)
    const insertSql =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    await mysqlDB.execute(insertSql, [name, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};
