import { z } from "zod";

// Schema for creating a new order ./pages/api/orders/index.ts
export const CreateOrderSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters"),
  date: z.string().default(() => new Date().toISOString()),
  products: z.array(z.any()).default([]),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
