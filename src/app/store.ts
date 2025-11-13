import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customers/customerSlice";
import stockReducer from "../features/stock/stockSlice";
import salesReducer from "../features/sales/salesSlice";

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    stock: stockReducer,
    sales: salesReducer,
  },
});
