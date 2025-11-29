import type { NextApiRequest, NextApiResponse } from "next";
import { ref, get, set } from "firebase/database";
import { db } from "../../../../firebase/firebase";
import { CreateProductSchema } from "zodSchemas/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId } = req.query;

  if (!orderId || typeof orderId !== "string") {
    return res.status(400).json({ error: "Order ID is required" });
  }

  // create a new product
  if (req.method === "POST") {
    try {
      const parsed = CreateProductSchema.safeParse(req.body);
      if (!parsed.success) {
        const messages = parsed.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; ");
        return res.status(400).json({ error: messages });
      }
      const body = parsed.data;

      const orderRef = ref(db, `orders/${orderId}`);
      const snapshot = await get(orderRef);

      if (!snapshot.exists()) {
        return res.status(404).json({ error: "Order not found" });
      }

      const orderData = snapshot.val();
      const products = orderData.products || [];

      const newProduct = {
        ...body,
        id:
          req.body.id ||
          String(
            Math.max(...(products.map((p: any) => parseInt(p.id) || 0) + 1))
          ),
        orderId: orderId,
      };

      products.push(newProduct);

      await set(orderRef, {
        ...orderData,
        products,
      });

      console.log("New product created:", newProduct);
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error(`POST /api/orders/${orderId}/products error:`, error);
      return res.status(400).json({ error: "Failed to create product" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
