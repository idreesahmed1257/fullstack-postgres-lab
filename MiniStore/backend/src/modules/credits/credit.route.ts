import { Router } from "express";
import { validate } from "../../utils/validate";
import requireAuth from "../user/auth.middleware";
import { CreditController } from "./credit.controller";
import { sendCreditsSchema } from "./credit.schema";

const creditRouter: Router = Router();
const creditController = new CreditController();

creditRouter.post("/", validate(sendCreditsSchema), requireAuth, creditController.sendCredits);
creditRouter.get("/sent", requireAuth, creditController.getCreditsSent);
creditRouter.get("/received", requireAuth, creditController.getCreditsReceived);

export default creditRouter;
