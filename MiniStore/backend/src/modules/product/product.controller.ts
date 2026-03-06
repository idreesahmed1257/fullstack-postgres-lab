import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { successResponse, errorResponse } from "../../utils/response";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { searchTerm } = req.query;
      const products = await this.productService.fetchAllProducts(searchTerm as string);
      successResponse(res, products, "Fetched all products successfully");
    } catch (error) {
      errorResponse(res, error, 500);
    }
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productService.fetchProductById(id);
      successResponse(res, product, "Fetched product successfully");
    } catch (error) {
      errorResponse(res, error, 500);
    }
  };
}
