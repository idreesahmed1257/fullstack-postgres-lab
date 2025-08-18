import { Router } from "express";
import { OrderController } from "./order.controller";
import { validate } from "../../utils/validate";
import { createOrderSchema } from "./order.schema";
import requireAuth from "../user/auth.middleware";

const orderRouter: Router = Router();
const orderController = new OrderController();

orderRouter.post("/", requireAuth, validate(createOrderSchema), orderController.createOrder);
orderRouter.get("/user", requireAuth, orderController.getOrdersByUser);

export default orderRouter;
