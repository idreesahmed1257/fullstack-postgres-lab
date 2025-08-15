import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "./auth.middleware";
import { validate } from "../../utils/validate";
import { loginUserSchema, registerUserSchema } from "./user.schema";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/register", validate(registerUserSchema), userController.register);
userRouter.post("/login", validate(loginUserSchema), userController.login);
userRouter.post("/validate-token", authMiddleware, userController.validateToken);

export default userRouter;
