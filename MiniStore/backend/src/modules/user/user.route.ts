import { Router } from "express";
import { UserController } from "./user.controller";
import requireAuth from "./auth.middleware";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get("/me", requireAuth, userController.getSingleUser);

export default userRouter;
