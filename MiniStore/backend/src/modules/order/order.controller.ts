import { Response } from "express";
import { errorResponse, successResponse } from "../../utils/response";
import { AuthRequest } from "../user/auth.middleware";
import { OrderService } from "./order.service";
import { ProductService } from "../product/product.service";

export class OrderController {
  private orderService: OrderService;
  private productService: ProductService;

  constructor() {
    this.orderService = new OrderService();
    this.productService = new ProductService();
  }

  createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const { productIds, totalAmount } = req.body;

      if (!userId || !Array.isArray(productIds) || !totalAmount) {
        return errorResponse(res, "Missing required fields", 400);
      }
      const order = await this.orderService.createOrder(userId, productIds, totalAmount);
      successResponse(res, order, "Order created successfully");
    } catch (error) {
      errorResponse(res, error, 400);
    }
  };

  getOrdersByUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.user;
      if (!id) return errorResponse(res, "Missing userId param", 400);
      const orders = await this.orderService.getOrdersByUser(Number(id));

      const ordersWithProducts = await Promise.all(
        orders.map(async (order) => {
          const products = await this.productService.fetchProductsByIds(order.productIds);
          return { ...order, products };
        })
      );
      successResponse(res, ordersWithProducts, "Fetched user orders successfully");
    } catch (error) {
      errorResponse(res, error, 400);
    }
  };
}
