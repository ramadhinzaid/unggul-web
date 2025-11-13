import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customerApi } from "../../services/customerApi";
import type { RootState } from "../../types/appType";
import type Customer from "../../types/customerType";

interface CustomerState {
  customers: Customer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  status: "idle",
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await customerApi.getCustomers();
    if (response.status_code === 200) {
      return response.data!;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const addNewCustomer = createAsyncThunk(
  "customers/addNewCustomer",
  async (newCustomer: Omit<Customer, "id">) => {
    const response = await customerApi.addCustomer(newCustomer);
    if (response.status_code === 201) {
      toast.success(response.message);
      return response.data!;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const updateExistingCustomer = createAsyncThunk(
  "customers/updateExistingCustomer",
  async (customer: Customer) => {
    const response = await customerApi.updateCustomer(customer);
    if (response.status_code === 200) {
      toast.success(response.message);
      return response.data!;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const deleteExistingCustomer = createAsyncThunk(
  "customers/deleteExistingCustomer",
  async (customer_id: string) => {
    const response = await customerApi.deleteCustomer(customer_id);
    if (response.status_code === 200) {
      toast.success(response.message);
      return customer_id;
    } else {
      toast.error(response.message);
      throw new Error(response.message);
    }
  }
);

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action: PayloadAction<Customer[]>) => {
          state.status = "succeeded";
          state.customers = action.payload;
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(
        addNewCustomer.fulfilled,
        (state, action: PayloadAction<Customer>) => {
          state.customers.push(action.payload);
        }
      )
      .addCase(
        updateExistingCustomer.fulfilled,
        (state, action: PayloadAction<Customer>) => {
          const index = state.customers.findIndex(
            (c) => c.id === action.payload.id
          );
          if (index !== -1) {
            state.customers[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteExistingCustomer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.customers = state.customers.filter(
            (c) => c.id !== action.payload
          );
        }
      );
  },
});

export const selectCustomers = (state: RootState) => state.customers.customers;
export const selectCustomersStatus = (state: RootState) =>
  state.customers.status;

export default customerSlice.reducer;
