import axios, { AxiosError } from "axios";
import type Customer from "../types/customerType";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const customerApiClient = axios.create({
  baseURL: `${API_BASE_URL}/customers`,
});

interface ApiResponse<T> {
  status_code: number;
  message: string;
  data?: T;
}

export const customerApi = {
  getCustomers: async (): Promise<ApiResponse<Customer[]>> => {
    try {
      const response = await customerApiClient.get("/");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data;
        return { ...data };
      }
      return {
        status_code: 500,
        message: (error as Error).message,
      };
    }
  },
  addCustomer: async (
    customer: Omit<Customer, "id">
  ): Promise<ApiResponse<Customer>> => {
    try {
      const response = await customerApiClient.post("/", customer);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data;
        return { ...data };
      }
      return {
        status_code: 500,
        message: (error as Error).message,
      };
    }
  },
  updateCustomer: async (
    customer: Customer
  ): Promise<ApiResponse<Customer>> => {
    try {
      const response = await customerApiClient.put(`/${customer.id}`, customer);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data;
        return { ...data };
      }
      return {
        status_code: 500,
        message: (error as Error).message,
      };
    }
  },
  deleteCustomer: async (customer_id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await customerApiClient.delete(`/${customer_id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data;
        return { ...data };
      }
      return {
        status_code: 500,
        message: (error as Error).message,
      };
    }
  },
};
