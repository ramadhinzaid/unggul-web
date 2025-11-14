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
import { X } from "lucide-react";

export interface SalesFormHandle {
  submit: () => boolean;
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
    const [errors, setErrors] = useState({
      customer: "",
      products: "",
    });
    const [productErrors, setProductErrors] = useState<
      { code: string; qty: string }[]
    >([]);

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
      if (products.length < stock.length) {
        setProducts([...products, { code: "", qty: 1 }]);
      }
    };

    const handleDeleteProduct = (index: number) => {
      products.splice(index, 1);
      setProducts([...products]);
      const newProductErrors = [...productErrors];
      newProductErrors.splice(index, 1);
      setProductErrors(newProductErrors);
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

    const validate = () => {
      let isValid = true;
      const newErrors = { customer: "", products: "" };
      const newProductErrors: { code: string; qty: string }[] = [];

      if (!customerId) {
        newErrors.customer = "Customer is required";
        isValid = false;
      }

      if (products.length === 0) {
        newErrors.products = "At least one product must be added";
        isValid = false;
      } else {
        products.forEach((product, index) => {
          const productError = { code: "", qty: "" };
          if (!product.code) {
            productError.code = "Product is required";
            isValid = false;
          }
          if (product.qty < 1) {
            productError.qty = "Quantity must be greater than 0";
            isValid = false;
          }
          newProductErrors[index] = productError;
        });
      }

      setErrors(newErrors);
      setProductErrors(newProductErrors);
      return isValid;
    };

    const handleSubmit = () => {
      if (!validate()) {
        return false;
      }

      const customer = customers.find((c) => c.id == customerId);
      if (!customer) return false;

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
      return true;
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    const getSelectedCodes = (currentIndex: number) => {
      return products
        .filter((_, index) => index !== currentIndex)
        .map((p) => p.code)
        .filter((code) => code); // remove empty strings
    };

    return (
      <div className="sm:rounded-md sm:overflow-hidden">
        <div className="bg-white space-y-6 p-2">
          <div className="w-full">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <DatePicker
              showIcon
              name="date"
              selected={date}
              onChange={(value) => setDate(value ?? new Date())}
              className="w-full rounded-md bg-white text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <Select
            label="Customer"
            name="customer"
            value={customerId}
            items={customers.map((c) => (
              <SelectItem key={c.id} value={c.id} label={c.name} />
            ))}
            onChange={(e) => setCustomerId(e)}
            error={errors.customer}
          />

          <div>
            <div className="flex gap-3">
              <h3 className="flex-2 text-lg font-medium text-gray-900">
                Products
              </h3>
              <button
                type="button"
                onClick={handleAddProduct}
                disabled={products.length >= stock.length}
                className="flex-1 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
              >
                Add Product
              </button>
            </div>
            {errors.products && (
              <p className="mt-2 text-sm text-red-600">{errors.products}</p>
            )}
            {products.map((product, index) => {
              const selectedCodes = getSelectedCodes(index);
              const availableStock = stock.filter(
                (s) => !selectedCodes.includes(s.code)
              );
              return (
                <div key={index} className="grid grid-cols-12 gap-6 mt-4">
                  <div className="col-span-5">
                    <Select
                      label="Product"
                      value={product.code}
                      onChange={(e) => handleProductChange(index, "code", e)}
                      items={availableStock.map((s) => (
                        <SelectItem
                          key={s.code}
                          value={s.code}
                          label={s.name}
                        />
                      ))}
                      error={productErrors[index]?.code}
                    />
                  </div>
                  <TextField
                    span={2}
                    label="Quantity"
                    value={product.qty.toString()}
                    onChange={(e) =>
                      handleProductChange(index, "qty", Number(e))
                    }
                    error={productErrors[index]?.qty}
                  />
                  <button
                    onClick={() => handleDeleteProduct(index)}
                    className="mt-5 col-span-1 sm:col-span-1 items-center justify-items-center text-red-600 hover:text-red-900"
                  >
                    <X />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default SalesForm;
