export async function getAllOrders() {
  const res = await fetch("/api/orders");

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  return res.json();
}

export async function createOrder(orderData: any) {
  const res = await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to create order");
  }
  return data;
}

export async function createProduct(orderId: string, productData: any) {
  const res = await fetch(`/api/orders/${orderId}/products`, {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.error || `Failed to create product in order ${orderId}`
    );
  }
  return data;
}

export async function deleteOrder(orderId: string) {
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete order ${orderId}`);
  }
  return res.json();
}

export async function deleteProduct(orderId: string, productId: string) {
  const res = await fetch(`/api/orders/${orderId}/products/${productId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to delete product ${productId} from order ${orderId}`
    );
  }
  return res.json();
}

export const fetches = {
  getAllOrders,
  createOrder,
  createProduct,
  deleteOrder,
  deleteProduct,
};
