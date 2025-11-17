import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { salesApi } from "../../services/salesApi";
import type { RootState } from "../../types/appType";
import type Sale from "../../types/saleType";
import type { SaleRequest } from "../../types/saleType";

interface SalesState {
  sales: Sale[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SalesState = {
  sales: [],
  status: "idle",
  error: null,
};

export const fetchSales = createAsyncThunk("sales/fetchSales", async () => {
  const response = await salesApi.getSales();
  if (response.status_code === 200) {
    return response.data!;
  } else {
    toast.error(response.message);
    throw new Error(response.message);
  }
});

export const fetchSaleById = createAsyncThunk(
  "sales/fetchSaleById",
  async (id: string) => {
    const response = await salesApi.getSaleById(id);
    if (response.status_code === 200) {
      return response.data;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const addNewSale = createAsyncThunk(
  "sales/addNewSale",
  async (newSale: Omit<SaleRequest, "note">) => {
    const response = await salesApi.addSale(newSale);
    if (response.status_code === 201) {
      toast.success(response.message);
      return response.data!;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const updateExistingSale = createAsyncThunk(
  "sales/updateExistingSale",
  async (sale: SaleRequest) => {
    const response = await salesApi.updateSale(sale);
    if (response.status_code === 200) {
      toast.success(response.message);
      return response.data!;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const deleteExistingSale = createAsyncThunk(
  "sales/deleteExistingSale",
  async (id: string) => {
    const response = await salesApi.deleteSale(id);
    if (response.status_code === 200) {
      toast.success(response.message);
      return id;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSales.fulfilled, (state, action: PayloadAction<Sale[]>) => {
        state.status = "succeeded";
        state.sales = action.payload;
        for (let index = 0; index < state.sales.length; index++) {
          let sum = 0;
          state.sales[index].products.forEach((v) => {
            sum = sum + v.qty;
          });
          state.sales[index] = {
            ...state.sales[index],
            sumqty: sum,
          };
        }
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(addNewSale.fulfilled, (state, action: PayloadAction<Sale>) => {
        state.sales.push(action.payload);
      })
      .addCase(
        updateExistingSale.fulfilled,
        (state, action: PayloadAction<Sale>) => {
          const index = state.sales.findIndex(
            (s) => s.note === action.payload.note
          );
          if (index !== -1) {
            state.sales[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteExistingSale.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.sales = state.sales.filter((s) => s.note !== action.payload);
        }
      );
  },
});

export const selectSales = (state: RootState) => state.sales.sales;
export const selectSalesStatus = (state: RootState) => state.sales.status;

export default salesSlice.reducer;
