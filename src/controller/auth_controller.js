import Jwt from "jsonwebtoken";
import User from "../database/schema/user_schema.js";
import * as authService from "../services/auth_service.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;
    if (password === confirmPassword) {
      const newUser = await authService.register(name, email, password, role);
      res.json({
        message: "User created succesfully",
        data: newUser,
      });
    } else {
      res.send("password does not match");
    }
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
