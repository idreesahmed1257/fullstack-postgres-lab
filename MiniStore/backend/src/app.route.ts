// src/routes/app.route.ts
import { Router } from "express";
import creditRouter from "./modules/credits/credit.route";
import giftRouter from "./modules/gift/gift.route";
import orderRouter from "./modules/order/order.route";
import productRouter from "./modules/product/product.route";
import userRouter from "./modules/user/user.route";


const appRouter: Router = Router();

appRouter.use("/users", userRouter);
appRouter.use("/orders", orderRouter);
appRouter.use("/products", productRouter);
appRouter.use("/gifts", giftRouter);
appRouter.use("/credits", creditRouter);

export default appRouter;
