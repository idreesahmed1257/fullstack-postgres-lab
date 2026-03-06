import { z } from "zod";

export const sendGiftSchema = z.object({
  recipientEmail: z.email({ message: "Invalid email format" }),
  productIds: z.array(z.number().min(1, "Product ID cannot be empty")),
  totalAmount: z.number().positive({ message: "Total amount must be positive" }),
});
