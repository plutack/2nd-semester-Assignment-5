import Jwt from "jsonwebtoken";
import User from "../database/schema/user_schema.js";
import bcrypt from "bcrypt";

export const register = async (name, email, password, role) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("placeholder for there is new user");
  }

  password = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password,
    role,
  });
  delete newUser.password;
  await newUser.save();
  return newUser;
};
