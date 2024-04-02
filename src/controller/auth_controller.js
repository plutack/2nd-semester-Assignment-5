import Jwt from "jsonwebtoken";
import * as authService from "../services/auth_service.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;
    console.log(name,email, password)
    const newUser = await authService.register(
      name,
      email,
      password,
      confirmPassword,
      role,
    );
    res.json({
      message: "User created succesfully",
      data: newUser,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json({
      message: "Login Successful",
      data,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
