import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { stockApi } from "../../services/stockApi";
import { toast } from "react-toastify";
import type { RootState } from "../../types/appType";
import type Stock from "../../types/stockType";

interface StockState {
  stock: Stock[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StockState = {
  stock: [],
  status: "idle",
  error: null,
};

export const fetchStocks = createAsyncThunk("stock/fetchStocks", async () => {
  const response = await stockApi.getStocks();
  if (response.status_code === 200) {
    return response.data!;
  } else {
    toast.error(response.message);
    throw new Error(response.message);
  }
});

export const addNewStock = createAsyncThunk(
  "stock/addNewStock",
  async (newStock: Omit<Stock, "qty">) => {
    const response = await stockApi.addStock(newStock);
    if (response.status_code === 201) {
      toast.success(response.message);
      return response.data!;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const updateExistingStock = createAsyncThunk(
  "stock/updateExistingStock",
  async (stock: Stock) => {
    const response = await stockApi.updateStock(stock);
    if (response.status_code === 200) {
      toast.success(response.message);
      return response.data!;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const deleteExistingStock = createAsyncThunk(
  "stock/deleteExistingStock",
  async (code: string) => {
    const response = await stockApi.deleteStock(code);
    if (response.status_code === 200) {
      toast.success(response.message);
      return code;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchStocks.fulfilled,
        (state, action: PayloadAction<Stock[]>) => {
          state.status = "succeeded";
          state.stock = action.payload;
        }
      )
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(addNewStock.fulfilled, (state, action: PayloadAction<Stock>) => {
        state.stock.push(action.payload);
      })
      .addCase(
        updateExistingStock.fulfilled,
        (state, action: PayloadAction<Stock>) => {
          const index = state.stock.findIndex(
            (s) => s.code === action.payload.code
          );
          if (index !== -1) {
            state.stock[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteExistingStock.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.stock = state.stock.filter((s) => s.code !== action.payload);
        }
      );
  },
});

export const selectStock = (state: RootState) => state.stock.stock;
export const selectStockStatus = (state: RootState) => state.stock.status;

export default stockSlice.reducer;
