import { Router } from "express";
import * as authController from "../controller/auth_controller.js";

const authRoute = Router();
authRoute.post("/register", authController.register);

export default authRoute;
