import { Router } from "express";
import * as postController from "../controller/post_controller.js";
import { authMiddleware } from "../middleware/auth_middleware.js";
const postRoute = Router();

// postRoute.post("/", authMiddleware, postController.createPost)
postRoute.get("/", authMiddleware, postController.getAllPosts);

export default postRoute;
