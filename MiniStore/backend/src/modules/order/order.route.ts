import { Router } from "express";
import { OrderController } from "./order.controller";
import { authMiddleware } from "../user/auth.middleware";

const orderRouter: Router = Router();
const orderController = new OrderController();

orderRouter.post("/", authMiddleware, orderController.createOrder);
orderRouter.get("/user", authMiddleware, orderController.getOrdersByUser);

export default orderRouter;
