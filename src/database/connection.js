// import neccessary modules
import mongoose from "mongoose";

// create connection instance
export const connect = async () => {
  const uri = process.env.MONGODB_URI;
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
  return await mongoose.connect(uri, clientOptions);
  console.error("database error", err);
};
