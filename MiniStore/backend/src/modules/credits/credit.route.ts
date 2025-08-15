import { Router } from "express";
import { CreditController } from "./credit.controller";
import { authMiddleware } from "../user/auth.middleware";
import { validate } from "../../utils/validate";
import { sendCreditsSchema } from "./credit.schema";

const creditRouter: Router = Router();
const creditController = new CreditController();

creditRouter.post("/", validate(sendCreditsSchema), authMiddleware, creditController.sendCredits);
creditRouter.get("/sent", authMiddleware, creditController.getCreditsSent);
creditRouter.get("/received", authMiddleware, creditController.getCreditsReceived);

export default creditRouter;
