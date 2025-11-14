import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCustomers,
  deleteExistingCustomer,
  selectCustomersStatus,
} from "./customerSlice";
import Table, { TableItem } from "../../components/Table";
import type { AppDispatch } from "../../types/appType";
import type Customer from "../../types/customerType";
import Loading from "../../components/Loading";

const CustomerList: React.FC<{ onEdit: (customer: Customer) => void }> = ({
  onEdit,
}) => {
  const customers = useSelector(selectCustomers);
  const customerStatus = useSelector(selectCustomersStatus);
  const dispatch = useDispatch<AppDispatch>();

  if (customerStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table
                headers={["Customer ID", "Name", "Domicile", "Gender"]}
                items={customers.map((item) => (
                  <TableItem
                    key={item.id}
                    data={[item.id, item.name, item.domicile, `${item.gender}`]}
                    onEdit={() => onEdit(item)}
                    onDelete={() => dispatch(deleteExistingCustomer(item.id))}
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

export default CustomerList;
