import { z } from "zod";

export const sendCreditsSchema = z.object({
  recipientEmail: z.email("Invalid recipient email"),
  amount: z.number().positive("Amount must be a positive number"),
});
