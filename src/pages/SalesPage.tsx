import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SalesList from "../features/sales/SalesList";
import SalesForm, { type SalesFormHandle } from "../features/sales/SalesForm";
import Modal from "../components/Modal";
import { fetchSales, selectSalesStatus } from "../features/sales/salesSlice";
import { fetchStocks } from "../features/stock/stockSlice";
import { fetchCustomers } from "../features/customers/customerSlice";
import type { AppDispatch } from "../types/appType";
import type Sale from "../types/saleType";

const SalesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | undefined>(undefined);
  const formRef = useRef<SalesFormHandle>(null);
  const dispatch = useDispatch<AppDispatch>();
  const salesStatus = useSelector(selectSalesStatus);

  useEffect(() => {
    if (salesStatus === "idle") {
      dispatch(fetchStocks());
      dispatch(fetchCustomers());
      dispatch(fetchSales());
    }
  }, [salesStatus, dispatch]);

  const handleConfirm = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleEdit = (sale: Sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSale(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700">Sales</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
      >
        Add Sale
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title={selectedSale ? "Edit Sale" : "Add Sale"}
      >
        <SalesForm ref={formRef} saleToEdit={selectedSale} />
      </Modal>
      <SalesList onEdit={handleEdit} />
    </div>
  );
};

export default SalesPage;
