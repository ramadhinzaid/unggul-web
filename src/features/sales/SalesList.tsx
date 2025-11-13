import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSales,
  deleteExistingSale,
  selectSalesStatus,
} from "./salesSlice";
import Table, { TableItem } from "../../components/Table";
import type { AppDispatch } from "../../types/appType";
import type Sale from "../../types/saleType";
import { formatCurrency } from "../../services/utils";

const SalesList: React.FC<{ onEdit: (sale: Sale) => void }> = ({ onEdit }) => {
  const sales = useSelector(selectSales);
  const salesStatus = useSelector(selectSalesStatus);
  const dispatch = useDispatch<AppDispatch>();

  if (salesStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table
                headers={["ID Note", "Customer Name", "Subtotal"]}
                items={sales.map((item) => (
                  <TableItem
                    key={item.note}
                    data={[
                      item.note,
                      item.customer.name,
                      formatCurrency(item.subtotal),
                    ]}
                    onEdit={() => onEdit(item)}
                    onDelete={() => dispatch(deleteExistingSale(item.note))}
                  />
                ))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesList;
