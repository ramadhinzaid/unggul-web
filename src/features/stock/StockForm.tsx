import { useDispatch } from "react-redux";
import { addNewStock, updateExistingStock } from "./stockSlice";
import { useImperativeHandle, forwardRef, useState, useEffect } from "react";
import TextField from "../../components/TextField";
import type { AppDispatch } from "../../types/appType";
import type Stock from "../../types/stockType";
import { formatCurrency } from "../../services/utils";

export interface StockFormHandle {
  submit: () => boolean;
}

interface StockFormProps {
  stockToEdit?: Stock;
}

const StockForm = forwardRef<StockFormHandle, StockFormProps>(
  ({ stockToEdit }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({
      code: "",
      name: "",
      category: "",
      price: "",
    });

    useEffect(() => {
      if (stockToEdit) {
        setCode(stockToEdit.code);
        setName(stockToEdit.name);
        setCategory(stockToEdit.category);
        setPrice(stockToEdit.price);
      } else {
        setCode("");
        setName("");
        setCategory("");
        setPrice(0);
      }
    }, [stockToEdit]);

    const validate = () => {
      const newErrors = {
        code: "",
        name: "",
        category: "",
        price: "",
      };
      let isValid = true;
      if (!code) {
        newErrors.code = "Code is required";
        isValid = false;
      }
      if (!name) {
        newErrors.name = "Name is required";
        isValid = false;
      }
      if (!category) {
        newErrors.category = "Category is required";
        isValid = false;
      }
      if (price < 1) {
        newErrors.price = "Price must be greater than 0";
        isValid = false;
      }
      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = () => {
      if (!validate()) {
        return false;
      }
      if (stockToEdit) {
        dispatch(
          updateExistingStock({
            ...stockToEdit,
            code,
            name,
            category,
            price,
          })
        );
      } else {
        dispatch(
          addNewStock({
            code,
            name,
            category,
            price,
          })
        );
      }
      return true;
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <div className="sm:rounded-md sm:overflow-hidden">
        <div className="bg-white space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <TextField
              label="Code"
              name="code"
              value={code}
              onChange={(e) => setCode(e)}
              error={errors.code}
            />
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e)}
              error={errors.name}
            />

            <TextField
              label="Category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e)}
              error={errors.category}
            />

            <TextField
              label="Price"
              name="price"
              prefixText="Rp"
              value={formatCurrency(price, true)}
              onChange={(e) => setPrice(Number(e.replaceAll(".", "")))}
              error={errors.price}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default StockForm;
