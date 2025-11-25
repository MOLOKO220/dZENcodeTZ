import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ordersData } from "./ordersData";
import { StoreType, OrderType, ProductType } from "../types/types";

const initialState: StoreType = {
  orders: ordersData,
  searchOrderTerm: "",
  searchProductTerm: "",
};

const mainReducer = createSlice({
  name: "main",
  initialState,
  reducers: {
    removeOrder(state, action: PayloadAction<string>) {
      state.orders = state.orders.filter((el) => el.id !== action.payload);
    },
    removeProduct(
      state,
      action: PayloadAction<{ orderId: string; id: string }>
    ) {
      state.orders = state.orders.map((order) =>
        order.id === action.payload.orderId
          ? {
              ...order,
              products: order.products.filter(
                (p) => p.id !== action.payload.id
              ),
            }
          : order
      );
    },
    addOrder(state, action: PayloadAction<OrderType>) {
      state.orders = [...state.orders, action.payload];
    },
    addProduct(state, action: PayloadAction<ProductType>) {
      console.log(action.payload);
      state.orders = state.orders.map((order) =>
        order.id === action.payload.orderId
          ? { ...order, products: [...order.products, action.payload] }
          : order
      );
    },
    setSearchOrderTerm(state, action) {
      state.searchOrderTerm = action.payload;
    },
    setSearchProductTerm(state, action) {
      state.searchProductTerm = action.payload;
    },
  },
});

export const {
  removeOrder,
  removeProduct,
  addOrder,
  addProduct,
  setSearchOrderTerm,
  setSearchProductTerm,
} = mainReducer.actions;
export default mainReducer.reducer;
