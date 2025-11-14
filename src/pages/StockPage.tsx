import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockList from "../features/stock/StockList";
import StockForm, { type StockFormHandle } from "../features/stock/StockForm";
import Modal from "../components/Modal";
import { fetchStocks, selectStockStatus } from "../features/stock/stockSlice";
import type { AppDispatch } from "../types/appType";
import type Stock from "../types/stockType";

const StockPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | undefined>(
    undefined
  );
  const formRef = useRef<StockFormHandle>(null);
  const dispatch = useDispatch<AppDispatch>();
  const stockStatus = useSelector(selectStockStatus);

  useEffect(() => {
    if (stockStatus === "idle") {
      dispatch(fetchStocks());
    }
  }, [stockStatus, dispatch]);

  const handleConfirm = () => {
    if (formRef.current) {
      if (formRef.current.submit()) {
        handleCloseModal();
      }
    }
  };

  const handleEdit = (stock: Stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStock(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700">Stock</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
      >
        Add Stock
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title={selectedStock ? "Edit Stock" : "Add Stock"}
      >
        <StockForm ref={formRef} stockToEdit={selectedStock} />
      </Modal>
      <StockList onEdit={handleEdit} />
    </div>
  );
};

export default StockPage;
