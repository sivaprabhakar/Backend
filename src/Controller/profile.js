import Profile from "../Models/Profile.js";
import User from "../Models/User.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    const user = await User.findById(req.user.id).select("name email");

    res.json({
      name: user.name,
      email: user.email,
      age: profile?.age || "",
      dob: profile?.dob || "",
      contact: profile?.contact || ""
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, age, dob, contact } = req.body;

    await User.findByIdAndUpdate(req.user.id, { name, email });

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { age, dob, contact, userId: req.user.id },
      { upsert: true, new: true }
    );

    res.json({ message: "Profile updated successfully", profile });
  } catch {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
