import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { StoreType } from "../types/types";
import { fetches } from "../utils/fetches";

export const getAllOrdersThunk = createAsyncThunk("orders/getAll", async () => {
  return await fetches.getAllOrders();
});

export const deleteOrderThunk = createAsyncThunk(
  "orders/delete",
  async (orderId: string) => {
    await fetches.deleteOrder(orderId);
    return orderId;
  }
);

export const createOrderThunk = createAsyncThunk(
  "orders/create",
  async (orderData: any) => {
    return await fetches.createOrder(orderData);
  }
);

export const createProductThunk = createAsyncThunk(
  "products/create",
  async ({ orderId, productData }: { orderId: string; productData: any }) => {
    return await fetches.createProduct(orderId, productData);
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/delete",
  async ({ orderId, productId }: { orderId: string; productId: string }) => {
    await fetches.deleteProduct(orderId, productId);
    return { orderId, productId };
  }
);

const initialState: StoreType = {
  orders: [],
  searchOrderTerm: "",
  searchProductTerm: "",
  loading: false,
};

const mainReducer = createSlice({
  name: "main",
  initialState,
  reducers: {
    setSearchOrderTerm(state, action) {
      state.searchOrderTerm = action.payload;
    },
    setSearchProductTerm(state, action) {
      state.searchProductTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrdersThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllOrdersThunk.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      state.orders = state.orders.filter((el) => el.id !== action.payload);
    });

    builder.addCase(createOrderThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.orders.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createOrderThunk.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createProductThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      const prod = action.payload;
      state.orders = state.orders.map((order) =>
        order.id === prod.orderId
          ? { ...order, products: [...(order.products ?? []), prod] }
          : order
      );
      state.loading = false;
    });
    builder.addCase(createProductThunk.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      const { orderId, productId } = action.payload;
      state.orders = state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              products: (order.products ?? []).filter(
                (p) => p.id !== productId
              ),
            }
          : order
      );
    });
  },
});

export const { setSearchOrderTerm, setSearchProductTerm } = mainReducer.actions;
export default mainReducer.reducer;
