import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "./auth.middleware";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/validate-token", authMiddleware, userController.validateToken);

export default userRouter;
