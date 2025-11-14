import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStock,
  deleteExistingStock,
  selectStockStatus,
} from "./stockSlice";
import Table, { TableItem } from "../../components/Table";
import type { AppDispatch } from "../../types/appType";
import type Stock from "../../types/stockType";
import { formatCurrency } from "../../services/utils";
import Loading from "../../components/Loading";

const StockList: React.FC<{ onEdit: (stock: Stock) => void }> = ({
  onEdit,
}) => {
  const stock = useSelector(selectStock);
  const stockStatus = useSelector(selectStockStatus);
  const dispatch = useDispatch<AppDispatch>();

  if (stockStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table
                headers={["Code", "Name", "Category", "Price"]}
                items={stock.map((item) => (
                  <TableItem
                    key={item.code}
                    data={[
                      item.code,
                      item.name,
                      item.category,
                      formatCurrency(item.price),
                    ]}
                    onEdit={() => onEdit(item)}
                    onDelete={() => dispatch(deleteExistingStock(item.code))}
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

export default StockList;
