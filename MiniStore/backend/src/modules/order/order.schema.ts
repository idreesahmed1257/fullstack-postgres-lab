import { z } from "zod";

export const createOrderSchema = z.object({
  productIds: z.array(z.number().min(1, "Product ID cannot be empty")),
  totalAmount: z.number().positive({ message: "Total amount must be positive" }),
});
