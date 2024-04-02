import Jwt from "jsonwebtoken";
import User from "../database/schema/user_schema.js";
import bcrypt, { compareSync } from "bcrypt";
import { ErrorWithStatusCode } from "../exceptions/customErrorConstructor.js";

export const register = async (
  name,
  email,
  password,
  confirmPassword,
  role,
) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new ErrorWithStatusCode("user already exists", 400);
  }
  if (password !== confirmPassword) {
    throw new ErrorWithStatusCode("Password does not match", 400);
  }

  password = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password,
    role,
  });
  console.log(newUser);
  await newUser.save();
  return newUser;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new ErrorWithStatusCode("Unauthorized", 401);
  }
  const JWTSecret = process.env.JWTSECRET || "secret";
  const accessToken = Jwt.sign(
    {
      role: user.role || "USER",
      email: user.email,
      _id: user._id,
    },
    JWTSecret,
    // {
    //   expiresIn: "5m",
    // },
  );
  return {
    accessToken,
    user,
  };
};
