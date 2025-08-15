import { Router } from "express";
import { ProductController } from "./product.controller";
import { authMiddleware } from "../user/auth.middleware";
import { getProductByIdSchema } from "./product.schema";
import { validate } from "../../utils/validate";

const productRouter: Router = Router();
const productController = new ProductController();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);

export default productRouter;
