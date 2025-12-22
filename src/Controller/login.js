import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mysqlDB } from "../Config/mysql.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  try {
    // Find user by email (Prepared Statement)
    const sql = "SELECT id, email, password FROM users WHERE email = ?";
    const [users] = await mysqlDB.execute(sql, [email]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUser = users[0];

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Response
    return res.status(200).json({
      message: "Login successful",
      token,
      id: existingUser.id,
      email: existingUser.email
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
