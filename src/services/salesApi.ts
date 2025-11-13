import axios, { AxiosError } from "axios";
import type Sale from "../types/saleType";
import type { SaleRequest } from "../types/saleType";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const salesApiClient = axios.create({
  baseURL: `${API_BASE_URL}/sales`,
});

interface ApiResponse<T> {
  status_code: number;
  message: string;
  data?: T;
}

export const salesApi = {
  getSales: async (): Promise<ApiResponse<Sale[]>> => {
    try {
      const response = await salesApiClient.get("/");
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
  getSaleById: async (id: string): Promise<ApiResponse<Sale>> => {
    try {
      const response = await salesApiClient.get(`/${id}`);
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
  addSale: async (
    sale: Omit<SaleRequest, "note">
  ): Promise<ApiResponse<Sale>> => {
    try {
      const response = await salesApiClient.post("/", sale);
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
  updateSale: async (sale: SaleRequest): Promise<ApiResponse<Sale>> => {
    try {
      const response = await salesApiClient.put(`/${sale.note}`, sale);
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
  deleteSale: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await salesApiClient.delete(`/${id}`);
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
