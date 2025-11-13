import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerList from "../features/customers/CustomerList";
import CustomerForm, {
  type CustomerFormHandle,
} from "../features/customers/CustomerForm";
import Modal from "../components/Modal";
import {
  fetchCustomers,
  selectCustomersStatus,
} from "../features/customers/customerSlice";
import type { AppDispatch } from "../types/appType";
import type Customer from "../types/customerType";

const CustomerPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);
  const formRef = useRef<CustomerFormHandle>(null);
  const dispatch = useDispatch<AppDispatch>();
  const customerStatus = useSelector(selectCustomersStatus);

  useEffect(() => {
    if (customerStatus === "idle") {
      dispatch(fetchCustomers());
    }
  }, [customerStatus, dispatch]);

  const handleConfirm = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700">Customers</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
      >
        Add Customer
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title={selectedCustomer ? "Edit Customer" : "Add Customer"}
      >
        <CustomerForm ref={formRef} customerToEdit={selectedCustomer} />
      </Modal>
      <CustomerList onEdit={handleEdit} />
    </div>
  );
};

export default CustomerPage;
