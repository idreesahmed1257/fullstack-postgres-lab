import { Router } from "express";
import { ProductController } from "./product.controller";

const productRouter: Router = Router();
const productController = new ProductController();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);

export default productRouter;
