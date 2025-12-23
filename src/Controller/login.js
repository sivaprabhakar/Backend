import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      id: user._id,
      email: user.email,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
