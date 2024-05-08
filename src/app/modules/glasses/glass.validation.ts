import { z } from "zod";

const glassAddValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
      invalid_type_error: "name must be string",
    }),
    image: z.string({
      required_error: "image is required",
      invalid_type_error: "image must be string",
    }),
    frame: z.string({
      required_error: "frame is required",
      invalid_type_error: "frame must be string",
    }),
    shape: z.string({
      required_error: "shape is required",
      invalid_type_error: "shape must be string",
    }),
    lensType: z.string({
      required_error: "lensType is required",
      invalid_type_error: "lensType must be string",
    }),
    frameSize: z.string({
      required_error: "frameSize is required",
      invalid_type_error: "frameSize must be string",
    }),
    brand: z.string({
      required_error: "brand is required",
      invalid_type_error: "brand must be string",
    }),
    price: z.number({
      required_error: "price is required",
      invalid_type_error: "price must be number",
    }),
    quantity: z.number({
      required_error: "quantity is required",
      invalid_type_error: "quantity must be number",
    }),
    gender: z.string({
      required_error: "gender is required",
      invalid_type_error: "gender must be string",
    }),
    color: z.string({
      required_error: "color is required",
      invalid_type_error: "color must be string",
    }),
  }),
});

const glassUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    frame: z.string().optional(),
    shape: z.string().optional(),
    lensType: z.string().optional(),
    frameSize: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().optional(),
    gender: z.string().optional(),
    color: z.string().optional(),
  }),
});

const multipleGlassDeleteSchema = z.object({
  body: z.object({
    products: z
      .string({
        required_error: "Products are required",
        invalid_type_error: "Products must be an array of string",
      })
      .array(),
  }),
});

export const glassValidationSchemas = {
  glassAddValidationSchema,
  glassUpdateValidationSchema,
  multipleGlassDeleteSchema,
};
