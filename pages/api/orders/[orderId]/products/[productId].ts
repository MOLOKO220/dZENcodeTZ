import type { NextApiRequest, NextApiResponse } from "next";
import { ref, get, set } from "firebase/database";
import { db } from "../../../../../firebase/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId, productId } = req.query;

  if (!orderId || typeof orderId !== "string") {
    return res.status(400).json({ error: "Order ID is required" });
  }

  if (!productId || typeof productId !== "string") {
    return res.status(400).json({ error: "Product ID is required" });
  }

  // delete a product
  if (req.method === "DELETE") {
    try {
      const orderRef = ref(db, `orders/${orderId}`);
      const snapshot = await get(orderRef);

      if (!snapshot.exists()) {
        return res.status(404).json({ error: "Order not found" });
      }

      const orderData = snapshot.val();
      const products = orderData.products || [];

      const productIndex = products.findIndex(
        (p: any) => String(p.id) === String(productId)
      );

      if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found" });
      }

      products.splice(productIndex, 1);

      await set(orderRef, {
        ...orderData,
        products,
      });

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(
        `DELETE /api/orders/${orderId}/products/${productId} error:`,
        error
      );
      return res.status(500).json({ error: "Failed to delete product" });
    }
  }

  res.setHeader("Allow", ["DELETE", "PATCH"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
