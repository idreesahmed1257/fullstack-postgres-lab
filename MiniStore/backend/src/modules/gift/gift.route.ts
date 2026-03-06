import { Router } from "express";
import { validate } from "../../utils/validate";
import requireAuth from "../user/auth.middleware";
import { GiftController } from "./gift.controller";
import { sendGiftSchema } from "./gift.schema";

const giftRouter: Router = Router();
const giftController = new GiftController();

giftRouter.post("/", requireAuth, validate(sendGiftSchema), giftController.sendGift);
giftRouter.get("/sent", requireAuth, giftController.getGiftsSent);
giftRouter.get("/received", requireAuth, giftController.getGiftsReceived);

export default giftRouter;
