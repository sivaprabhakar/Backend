import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  age: Number,
  dob: String,
  contact: String
});

export default mongoose.model("Profile", profileSchema);
