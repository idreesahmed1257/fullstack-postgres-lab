import { Response } from "express";
import { CreditService } from "./credit.service";
import { successResponse, errorResponse } from "../../utils/response";
import { AuthRequest } from "../user/auth.middleware";

export class CreditController {
  private creditService: CreditService;

  constructor() {
    this.creditService = new CreditService();
  }

  sendCredits = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { recipientEmail, amount } = req.body;
      const senderId = req.user?.id;

      if (!senderId || !recipientEmail || !amount) {
        return errorResponse(res, "Missing required fields", 400);
      }

      const creditTransfer = await this.creditService.sendCredits(senderId, recipientEmail, amount);
      successResponse(res, creditTransfer, "Credits sent successfully");
    } catch (error) {
      errorResponse(res, error, 400);
    }
  };

  getCreditsSent = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;

      const credits = await this.creditService.getCreditsSent(userId);
      successResponse(res, credits, "Fetched sent credits successfully");
    } catch (error) {
      errorResponse(res, error, 400);
    }
  };

  getCreditsReceived = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) return errorResponse(res, "User not authenticated", 401);

      const credits = await this.creditService.getCreditsReceived(userId);
      successResponse(res, credits, "Fetched received credits successfully");
    } catch (error) {
      errorResponse(res, error, 400);
    }
  };
}
