import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewSale, updateExistingSale } from "./salesSlice";
import { selectCustomers } from "../customers/customerSlice";
import { selectStock } from "../stock/stockSlice";
import TextField from "../../components/TextField";
import Select, { SelectItem } from "../../components/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { AppDispatch } from "../../types/appType";
import type Sale from "../../types/saleType";

export interface SalesFormHandle {
  submit: () => void;
}

interface SalesFormProps {
  saleToEdit?: Sale;
}

const SalesForm = forwardRef<SalesFormHandle, SalesFormProps>(
  ({ saleToEdit }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const customers = useSelector(selectCustomers);
    const stock = useSelector(selectStock);
    const [customerId, setCustomerId] = useState("");
    const [date, setDate] = useState(new Date());
    const [products, setProducts] = useState<{ code: string; qty: number }[]>(
      []
    );

    useEffect(() => {
      if (saleToEdit) {
        const customer = customers.find(
          (c) => c.name === saleToEdit.customer.name
        );
        if (customer) {
          setCustomerId(customer.id);
        }
        console.log(saleToEdit);
        setProducts(
          saleToEdit.products.map((p) => ({ code: p.code, qty: p.qty }))
        );
      } else {
        setCustomerId("");
        setProducts([]);
      }
    }, [saleToEdit, customers]);

    const handleAddProduct = () => {
      setProducts([...products, { code: "", qty: 1 }]);
    };

    const handleDeleteProduct = (index: number) => {
      products.splice(index, 1);
      setProducts([...products]);
    };

    const handleProductChange = (
      index: number,
      field: string,
      value: string | number
    ) => {
      const newProducts = [...products];
      if (field === "code") {
        newProducts[index].code = value as string;
      } else {
        newProducts[index].qty = value as number;
      }
      setProducts(newProducts);
    };

    const handleSubmit = () => {
      const customer = customers.find((c) => c.id == customerId);
      if (!customer) return;

      const saleProducts = products.map((p) => {
        const stockItem = stock.find((s) => s.code == p.code);
        return { ...stockItem!, qty: p.qty };
      });

      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const dateFormated = new Intl.DateTimeFormat("sv-SE", options).format(
        date
      );

      if (saleToEdit) {
        dispatch(
          updateExistingSale({
            ...saleToEdit,
            date: dateFormated,
            customer_id: customer.id.toString(),
            products: saleProducts,
          })
        );
      } else {
        dispatch(
          addNewSale({
            date: dateFormated,
            customer_id: customer.id.toString(),
            products: saleProducts,
          })
        );
      }
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <div className="sm:rounded-md sm:overflow-hidden">
        <div className="bg-white space-y-6">
          <DatePicker
            selected={date}
            onChange={(value) => setDate(value ?? new Date())}
            className="block w-full rounded-md bg-white mt-1 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          <Select
            label="Customer"
            name="customer"
            value={customerId}
            items={customers.map((c) => (
              <SelectItem key={c.id} value={c.id} label={c.name} />
            ))}
            onChange={(e) => setCustomerId(e)}
          />

          <div>
            <h3 className="text-lg font-medium text-gray-900">Products</h3>
            {products.map((product, index) => (
              <div key={index} className="grid grid-cols-12 gap-6 mt-4">
                <div className="col-span-5">
                  <label className="block text-sm font-medium text-gray-700"></label>
                  <Select
                    label="Product"
                    value={product.code}
                    onChange={(e) => handleProductChange(index, "code", e)}
                    items={stock.map((s) => (
                      <SelectItem key={s.code} value={s.code} label={s.name} />
                    ))}
                  />
                </div>
                <TextField
                  span={2}
                  label="Quantity"
                  value={product.qty.toString()}
                  onChange={(e) => handleProductChange(index, "qty", Number(e))}
                />
                <button
                  onClick={() => handleDeleteProduct(index)}
                  className="mt-5 col-span-1 sm:col-span-1 items-center justify-items-center text-red-600 hover:text-red-900"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProduct}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default SalesForm;
