import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z.string({
      required_error: "Password is required",
    }),

    lastName: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(["SELLER", "USER"], {
      required_error: "Role is required",
    }),
    avatar: z.string().optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginZodSchema,
};
