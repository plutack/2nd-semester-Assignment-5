// import neccessary modules
import mongoose from "mongoose";

// create connection instance
export const connect = async () => {
  const { MONGODB_URI } = process.env;
  return await mongoose.connect(MONGODB_URI);
  console.error("database error", err);
};
