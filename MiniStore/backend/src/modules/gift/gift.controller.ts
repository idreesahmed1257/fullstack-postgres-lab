import { Request, Response } from "express";
import { GiftService } from "./gift.service";
import { successResponse, errorResponse } from "../../utils/response";
import { AuthRequest } from "../user/auth.middleware";
import { ProductService } from "../product/product.service";

export class GiftController {
  private giftService: GiftService;
  private productService: ProductService;

  constructor() {
    this.giftService = new GiftService();
    this.productService = new ProductService();
  }

  sendGift = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { recipientEmail, productIds, totalAmount } = req.body;
      const senderId = req.user?.id;

      if (!senderId || !recipientEmail || !Array.isArray(productIds) || !totalAmount) {
        return errorResponse(res, "Missing required fields", 400);
      }

      const gift = await this.giftService.sendGift(senderId, recipientEmail, productIds, totalAmount);
      successResponse(res, gift, "Gift sent successfully");
    } catch (error) {
      errorResponse(res, error, 400);
    }
  };

  getGiftsSent = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) return errorResponse(res, "User not authenticated", 401);

      const gifts = await this.giftService.getGiftsSent(userId);

      const giftWithProducts = await Promise.all(
        gifts.map(async (gift) => {
          const products = await this.productService.fetchProductsByIds(gift.productIds);
          return { ...gift, products };
        })
      );

      successResponse(res, giftWithProducts, "Fetched sent gifts successfully");
    } catch (error) {
      errorResponse(res, error, 400);
    }
  };

  getGiftsReceived = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) return errorResponse(res, "User not authenticated", 401);

      const gifts = await this.giftService.getGiftsReceived(userId);

      const giftWithProducts = await Promise.all(
        gifts.map(async (gift) => {
          const products = await this.productService.fetchProductsByIds(gift.productIds);
          return { ...gift, products };
        })
      );
      successResponse(res, giftWithProducts, "Fetched received gifts successfully");
    } catch (error) {
      errorResponse(res, error, 400);
    }
  };
}
