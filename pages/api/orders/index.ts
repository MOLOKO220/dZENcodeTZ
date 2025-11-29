import type { NextApiRequest, NextApiResponse } from "next";
import { ref, get, push, set } from "firebase/database";
import { db } from "../../../firebase/firebase";
import { CreateOrderSchema } from "zodSchemas/order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get all orders
  if (req.method === "GET") {
    try {
      const ordersRef = ref(db, "orders");
      const snapshot = await get(ordersRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert Firebase object to array
        const ordersArray = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value,
        }));
        return res.status(200).json(ordersArray);
      } else {
        // No orders in Firebase
        return res.status(200).json(["No orders in Firebase"]);
      }
    } catch (error) {
      console.error("GET /api/orders error:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch orders from Firebase" });
    }
  }

  // create a new order
  if (req.method === "POST") {
    try {
      // validate
      const parsed = CreateOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.issues.map((i) => i.message).join(", "),
        });
      }

      const body = parsed.data;
      const ordersRef = ref(db, "orders");
      const newOrderRef = push(ordersRef);

      const newOrder = {
        ...body,
        id: newOrderRef.key,
      };

      // Write to Firebase
      await set(newOrderRef, newOrder);

      return res.status(201).json(newOrder);
    } catch (error) {
      console.error("POST /api/orders error:", error);
      return res.status(400).json({ error: "Failed to create order" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
