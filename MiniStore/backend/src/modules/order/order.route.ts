import { Router } from "express";
import { OrderController } from "./order.controller";
import { authMiddleware } from "../user/auth.middleware";
import { validate } from "../../utils/validate";
import { createOrderSchema } from "./order.schema";

const orderRouter: Router = Router();
const orderController = new OrderController();

orderRouter.post("/", authMiddleware, validate(createOrderSchema), orderController.createOrder);
orderRouter.get("/user", authMiddleware, orderController.getOrdersByUser);

export default orderRouter;
