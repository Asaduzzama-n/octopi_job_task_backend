import { z } from "zod";

const createProductZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    price: z.number().positive("Price must be a positive number"),
    image: z.string().url("Image must be a valid URL"),
    manufacturer: z.string().min(1, "Manufacturer is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    createdBy: z.number().int("Created by must be a valid user ID"),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
};
