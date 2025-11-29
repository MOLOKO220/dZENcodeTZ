import type { NextApiRequest, NextApiResponse } from "next";
import { ref, get, remove } from "firebase/database";
import { db } from "../../../firebase/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId } = req.query;

  if (!orderId || typeof orderId !== "string") {
    return res.status(400).json({ error: "Order ID is required" });
  }

  // delete a order
  if (req.method === "DELETE") {
    try {
      const orderRef = ref(db, `orders/${orderId}`);
      const snapshot = await get(orderRef);

      if (!snapshot.exists()) {
        return res.status(404).json({ error: "Order not found" });
      }

      await remove(orderRef);

      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error(`DELETE /api/orders/${orderId} error:`, error);
      return res.status(500).json({ error: "Failed to delete order" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
