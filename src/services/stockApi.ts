import axios, { AxiosError } from "axios";
import type Stock from "../types/stockType";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const stockApiClient = axios.create({
  baseURL: `${API_BASE_URL}/stocks`,
});

interface ApiResponse<T> {
  status_code: number;
  message: string;
  data?: T;
}

export const stockApi = {
  getStocks: async (): Promise<ApiResponse<Stock[]>> => {
    try {
      const response = await stockApiClient.get("/");
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
  addStock: async (stock: Omit<Stock, "qty">): Promise<ApiResponse<Stock>> => {
    try {
      const response = await stockApiClient.post("/", stock);
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
  updateStock: async (stock: Stock): Promise<ApiResponse<Stock>> => {
    try {
      const response = await stockApiClient.put(`/${stock.code}`, stock);
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
  deleteStock: async (code: string): Promise<ApiResponse<null>> => {
    try {
      const response = await stockApiClient.delete(`/${code}`);
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
