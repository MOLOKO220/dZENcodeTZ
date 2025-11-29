import { z } from "zod";

// Schema for creating a new product ./pages/api/orders/[orderId]/index.ts

export const CreateProductSchema = z.object({
  id: z.string().nonempty("ID is required"),
  photo: z.string().nonempty("Photo is required"),
  title: z.string().min(4, "Title must be at least 4 characters"),
  type: z.string().min(1, "Type is required"),
  specification: z.string().min(1, "Specification is required"),
  guarantee: z.object({
    start: z.string().nonempty("Guarantee start date is required"),
    end: z.string().nonempty("Guarantee end date is required"),
  }),
  price: z
    .array(
      z.object({
        value: z.number().min(0, "Price must be a positive number"),
        symbol: z.string().nonempty("Currency symbol is required"),
      })
    )
    .nonempty("Price array cannot be empty"),
  orderId: z.string().nonempty("Order ID is required"),
  date: z.string().nonempty("Date is required"),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
