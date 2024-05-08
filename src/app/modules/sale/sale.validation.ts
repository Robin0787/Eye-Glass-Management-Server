import { z } from "zod";

const saleProductAddValidationSchema = z.object({
  body: z.object({
    buyerName: z.string(),
    product: z.string(),
    quantity: z.number().min(1, "quantity must be greater than 0"),
    date: z.string(),
  }),
});

export const saleProductValidationSchemas = {
  saleProductAddValidationSchema,
};
