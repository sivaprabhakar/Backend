import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_DB}`
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  }
};

export default connectMongo;
