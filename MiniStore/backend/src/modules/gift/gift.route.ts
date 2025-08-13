import { Router } from "express";
import { GiftController } from "./gift.controller";
import { authMiddleware } from "../user/auth.middleware";

const giftRouter: Router = Router();
const giftController = new GiftController();

giftRouter.post("/", authMiddleware, giftController.sendGift);
giftRouter.get("/sent", authMiddleware, giftController.getGiftsSent);
giftRouter.get("/received", authMiddleware, giftController.getGiftsReceived);

export default giftRouter;
