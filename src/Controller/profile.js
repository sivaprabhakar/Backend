import Profile from "../Models/profile.js";
import { mysqlDB } from "../Config/mysql.js";

export const getUserInfo = async (req, res) => {
  try {
    const sql = "SELECT name, email FROM users WHERE id = ?";
    const [rows] = await mysqlDB.execute(sql, [req.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("UserId from token:", req.userId);
    console.log("Body data:", req.body);

    const { age, dob, contact } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { age, dob, contact },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      profile
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

