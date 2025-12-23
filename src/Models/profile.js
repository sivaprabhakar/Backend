import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    age: Number,
    dob: String,
    contact: String
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
