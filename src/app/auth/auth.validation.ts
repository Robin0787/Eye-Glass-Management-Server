import { z } from "zod";

const registerUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "firstName is required",
      invalid_type_error: "firstName must be string",
    }),
    lastName: z
      .string({
        invalid_type_error: "lastName must be string",
      })
      .optional(),
    email: z.string({
      required_error: "email is required",
      invalid_type_error: "email must be string",
    }),
    password: z.string({
      required_error: "password is required",
      invalid_type_error: "password must be string",
    }),
    role: z.enum(["user", "manager"] as [string, ...string[]], {
      required_error: "role is required",
      invalid_type_error: "Role must be either 'user' or 'manager'",
    }),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required",
      invalid_type_error: "email must be string",
    }),
    password: z.string({
      required_error: "password is required",
      invalid_type_error: "password must be string",
    }),
  }),
});

export const userValidationSchemas = {
  registerUserValidationSchema,
  loginUserValidationSchema,
};
