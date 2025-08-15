import { Router } from "express";
import { GiftController } from "./gift.controller";
import { authMiddleware } from "../user/auth.middleware";
import { validate } from "../../utils/validate";
import { sendGiftSchema } from "./gift.schema";

const giftRouter: Router = Router();
const giftController = new GiftController();

giftRouter.post("/", authMiddleware, validate(sendGiftSchema), giftController.sendGift);
giftRouter.get("/sent", authMiddleware, giftController.getGiftsSent);
giftRouter.get("/received", authMiddleware, giftController.getGiftsReceived);

export default giftRouter;
