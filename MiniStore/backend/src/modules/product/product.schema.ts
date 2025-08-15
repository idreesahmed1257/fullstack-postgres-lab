import z from "zod";

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.number(),
  }),
});
