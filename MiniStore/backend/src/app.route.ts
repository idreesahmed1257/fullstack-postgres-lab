// src/routes/app.route.ts
import { Router } from "express";
import userRouter from "./modules/user/user.route";
import productRouter from "./modules/product/product.route";
import orderRouter from "./modules/order/order.route";
import giftRouter from "./modules/gift/gift.route";
import creditRouter from "./modules/credits/credit.route";

const appRouter: Router = Router();

appRouter.use("/users", userRouter);
appRouter.use("/products", productRouter);
appRouter.use("/orders", orderRouter);
appRouter.use("/gifts", giftRouter);
appRouter.use("/credits", creditRouter);

export default appRouter;
